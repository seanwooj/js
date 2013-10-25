# The Module Pattern

## Namespacing

In early days, there was a common problem with JavaScript namespacing:

```javascript
// library1.js
function each(arr) {
  // ...
}

// library2.js
function each(arr) {
  // ...
}
```

The problem is that the two libraries both define an `each` function
at the top level. Whichever library loads last will overwrite the
other's version of `each`.

The solution is to **namespace** the library code:

```javascript
// library1.js
var LibraryOne = {};

LibraryOne.each = function () {
  // ...
};

// library2.js
var LibraryTwo = {};

LibraryTwo.each = function () {
  // ...
};
```

Now we need to say `LibraryOne.each` or `LibraryTwo.each`, but the two
do not collide. This is what jQuery and underscore do (with variables
named `$` and `_`, for conciseness).

It is common for all the methods defined in a library to be namespaced
under a single top-level name.

## Anonymous function trick

Namespacing is important, but it can be a little annoying:

```javascript
var LongLibraryName = {};

LongLibraryName.func1 = function () {
  // do work
};

LongLibraryName.func2 = function () {
  // have to type all of LongLibraryName
  LongLibraryName.func1();
  LongLibraryName.func1();
  LongLibraryName.func1();
};
```

To solve this problem we define the library functions in an enclosing
anonymous function, which then returns the exported functions. Easier
shown than said:

```javascript
(function (objectToModify) {
  var LongLibraryName = objectToModify.LongLibraryName = (objectToModify.LongLibraryName || {});

  var func1 = LongLibraryName.func1 = function () {
    // do work
  }

  var func2 = LongLibraryName.func2 = function () {
    func1();
    func1();
    func1();
  }
})(someGlobalObject);
```

The anonymous function is immediately called: it gets passed the
`someGlobalObject` as argument `objectToModify`. By setting `objectToModify.LongLibraryName`, the
namespace is **exported** to the global scope so that other libraries
can access it.

Inside the anonymous function, we add functions to
`LongLibraryName`. However, we additionally store them in local
variables which can be referred to without the namespace
`LongLibraryName`.

## Breaking code across files

Just like in Ruby, we still want to split our JS code across many
files. The module pattern supports this:

```javascript
// file1.js
(function (objectToModify) {
  // note how this is careful to
  var LongLibraryName = objectToModify.LongLibraryName = (objectToModify.LongLibraryName || {});

  // define attributes in file1
  var Sandwich = LongLibraryName.Sandwich = function () {
    this.tasty = true;
  };
})(someGlobalObject);

// file2.js 
(function (objectToModify) {
  // note how this will be careful to not replace, but simply extend
  // `root.LongLibraryName`. That's because we use the `||`.
  var LongLibraryName = objectToModify.LongLibraryName = (objectToModify.LongLibraryName || {});

  // define attributes in file1
  var Panini = LongLibraryName.Panini = function () {
    this.tasty = true;
  };
})(someGlobalObject);
```

If `file1.js` is loaded first, `objectToModify.LongLibraryName` starts out as
`undefined`, so `objectToModify.LongLibraryName || {}` evaluates to the empty
object literal. When `file2.js` is subsequently loaded,
`objectToModify.LongLibraryName` will be the object that was built in
`file1.js`. Because it is not undefined, `(objectToModify.LongLibraryName || {})
== objectToModify.LongLibraryName`. Thus, the `Panini` class will be added to
the existing namespace.

## References

* http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html
