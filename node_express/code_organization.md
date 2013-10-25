# Organizing Your Code in Express

Putting everything in `app.js` can start to make the program pretty
unwieldy. Here you'll see a code organization pattern to clean it all
up.

Application components:
* Configuration & utilities (setup stuff)
* Routes & route actions
* Models
* Static Assets

Here's an example directory structure that would be nice to have:

```
app/
|
--controllers/
  |
  --users.js
  --posts.js
--views/
  |
  --users/
    |
    --index.ejs
  --posts/
    |
    --index.ejs
assets/
|
--javascripts/
  |
  --app.js
--stylesheets/
  |
  --app.css
config.js
server.js
package.json
```

Note that I've chosen to rename `app.js` to `server.js` since most of
the application functionality will be pushed out into files in
`app/controllers`.

## Node's module pattern

In node, for files to communicate with one another, one file would
require the other. What returns from the call to `require` depends on
whatever the required file exported using the `exports` object.

As an example, let's say there were two files - `dog.js` and `owner.js`
- and `owner.js` needed the `Dog` constructor function:

```
// dog.js

function Dog (name) {
  this.name = name;
}

Dog.prototype.bark = function () {
  console.log("woof!");
}

exports.Dog = Dog;
```

```
// owner.js

var Dog = require('./dog.js').Dog

function Owner (own_name, dog_name) {
  this.name = own_name;
  this.dog = new Dog(dog_name);
}
```

Note that `exports` is an object and a call to `require` will return the
`exports` object of that file or library. In this case, `dog.js`'s
`exports` object would look like this:

```
{
  Dog: [Dog Constructor]
}
```

`owner.js` requires `dog.js` and stores the `Dog` constructor in a local
variable named `Dog` which it can then use however it needs to.

## Using `exports` with Express

We'll use node's `exports` functionality to break up our code into
multiple files. 

The key piece that needs to be shared is the `app`
object, on which we set all the application's routes and configuration
options. 

You might be tempted to export the `app` object and have every other
file require `server.js` and do whatever it'd like with the `app`
object, but always better to inject dependencies. Each file will export
an `init` method that takes the `app` object as an argument and runs the
requisite methods. This has the added benefit of making `server.js` a
central run script that requires all the necessary components and starts
the server.

## `config.js`

Let's use the configuration as an example.

Here's some configuration logic that would initially be in `server.js`:

```
  // SERVER
  // Setup server log
  app.use(express.logger());

  // VIEWS
  // Change view directory
  app.set('views', './app/views');
  // Set EJS as renderer for plain HTML files
  app.engine('html', require('ejs').renderFile);

  // STATIC ASSETS
  app.use('/scripts', express.static('./assets/javascripts'));
  app.use('/stylesheets', express.static('./assets/stylesheets'));

  // COOKIES
  app.use(express.cookieParser());

```

Let's put that all in a file called `config.js` instead and export an
init function that will take the `app` object and run the same methods:

```
// config.js

var express = require('express');

exports.init = function (app) {
  // SERVER
  // Setup server log
  app.use(express.logger());

  // VIEWS
  // Change view directory
  app.set('views', './app/views');
  // Set EJS as renderer for plain HTML files
  app.engine('html', require('ejs').renderFile);

  // STATIC ASSETS
  app.use('/scripts', express.static('./assets/javascripts'));
  app.use('/stylesheets', express.static('./assets/stylesheets'));

  // COOKIES
  app.use(express.cookieParser());
}
``` 

In `server.js`, we can replace all that configuration code with a simple
require & init:

```
// server.js

require('./config.js').init(app);
```

Note in `config.js` the configuration related to assets and views -
those lines are what allow us to put all our views in `app/views/`
and all our static assets in `assets/javascripts` and
`assets/stylesheets`.

## Routes and Actions

We'll do the same thing for our routes. Put related groups of routes in
files in the `controllers/` folder and make sure that each file exports
an init function just like `config.js`.

In `server.js`, all you have to do is require each file in the
`controllers/` folder and call `init` passing in the `app` object:

```
// server.js


// Load all routes & controllers

// Read all filenames in app/controllers
var fs = require('fs');
var controllers = fs.readdirSync('./app/controllers');

// Require and run init method for each one
controllers.forEach(function (controller) {
  var controller = require('./app/controllers/' + controller);
  controller.init(app);
});

```


