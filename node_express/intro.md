# Express.js

## What is express.js?

Express.js is a lightweight web application framework for node.js, much
like Sinatra in Ruby.

As you're learning how to use node and express, always have the docs
handy. Links are at the bottom of this document. 

What do you get?
* Server
* Routing
* Request/response parsing
* Ships with MongoDB adapter

## Setup

Create a directory with two files in it: `package.json` and `app.js`.

### `package.json`

* Node projects require a `package.json` which serves as a sort of
  `Gemfile` (tracking dependencies) and has some identifying information
  about the application (name, description, version, etc.)
* `npm install` anytime you change dependencies

```
// package.json

{
    "name": "hello-world",
    "description": "hello world test app",
    "version": "0.0.1",
    "private": true,
    "dependencies": {
      "express": "3.4.2"
    }
}
```

### `app.js`

This file will create and kick off the node.js server. It will also
contain all your application code (mostly routes and route handlers).

Here's a simple 'Hello World!' application.

```
# app.js

var express = require('express');
var app = express();

app.get('/hello-world.html', function (req, res) {
  res.send('Hello World!');
});

app.listen(8181);
console.log("Listening on port 8181");
```

The critical portions are: 
* Requiring express 
* Creating the app (`var app = express();`)
* Defining a working route (the route could just have well been the root
  route '/') and route handler
* Calling `listen` on the `app` object

To run the application, run `$ node app.js` from the command line and
make a request from the browser.

Require `express`, create an `app` object, define routes & handlers,
start listening on a port. Run `$ node app.js` from the command line and
you're all set! Head to your browser and make a test request.

## References

* http://expressjs.com/guide.html
* http://expressjs.com/api.html
* http://nodejs.org/api/http.html

