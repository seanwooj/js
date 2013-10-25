# _.extend

Underscore comes with a wonderfully useful function, `_.extend`. At its core, the method takes two objects, and assigns the attributes of the second to the first. [Here][underscore-extend], have some docs.

The method has many uses, some of which we will enumerate here.

[underscore-extend]: http://underscorejs.org/#extend

## Shallow duplicates
One use of the `_.extend` is to make shallow duplicates of JavaScript objects. Here's an example:

```javascript
var data = { a_key: "A VALUE!" }
var new_data = _.extend({},data);
new_data.a_key = "A NEW VALUE!";

new_data;
  Object {a_key: "A NEW VALUE!"}
data;
  Object {a_key: "A VALUE!"}
```

## Merging objects
We can also use `_.extend` to merge JavaScript objects, just like we used `Hash#merge` to merge Ruby hashses. Here's an example:

```javascript
var first_hash = { first_key: "First value" };
var second_hash = { second_key: "Second value" };

_.extend(first_hash, second_hash);
  Object {first_key: "First value", second_key: "Second value"}

first_hash;
  Object {first_key: "First value", second_key: "Second value"}
```

## DRY class methods
Another use of the `_.extend` is to cleanly add methods to a constructor (i.e., class methods). Here's the way we do it now:

```javascript
var Constructor = function () { };

Constructor.a_class_method = function () {
  console.log("First class method!");
}

Constructor.another_class_method = function () {
  console.log("Second class method!");
}
```

But with underscore, we can DRY this up as follows:
```javascript
var Constructor = function () { };

_.extend(Constructor, {
  a_class_method: function() {
    console.log("First class method!");
  },

  another_class_method: function () {
    console.log("Second class method!");
  }
});
```

Also note that `this` gets bound properly within the function definitions; i.e inside the `a_class_method` function, `this` actually refers to `Constructor`.

## DRY instance methods
Similarly, we can dry up how we define instance methods. The way we currently know how to do it is as follows:

```javascript
var Constructor = function () { };

Constructor.prototype.instance_method_one = function () {
  console.log("First instance method!");
}

Constructor.prototype.instance_method_two = function () {
  console.log("Second instance method!");
}
```

Whereas with `_#extend`:
```javascript
var Constructor = function () { };

_.extend(Constructor.prototype, {
  instance_method_one: function() {
    console.log("First instance method!");
  },

  instance_method_two: function() {
    console.log("Second instance method!");
  },
});
```

Also note that `this` gets bound properly within the function definitions; i.e inside the `instance_method_one` function, `this` actually refers to the **instance** of `Constructor`.