# Node.js Chat App

## Overview

This project involves writing a minimalist chatting app, and the frequent small events involved in chatting functionality make it a great fit for Node.js.

## Phase 1: Setup

Start with the following directory structure:

```
//my_chat_app/
//|
//--lib/
//--public/
//  |
//  --javascripts/
//  --stylesheets/
// 
```

Node.js doesn't require any specific structure for your app, but we are going to use follow convention by using this structure.

### `package.json`

TODO: Explain this more?  Here or in a reading?

Add a package.json file to your root direcotory, and list "socket.io" version "~0.9.6" and "mime" version "~1.2.7" as dependencies.  We'll be using Socket.IO to polyfill websockets for a range of browsers, and the "mime" library will allow us to set the MIME types when serving static files.

## Phase 2: Serving Static Files

### `server.js`

In the root of your project directory, make a `server.js` file.  This is where you can instantiate and start a static file server.  You will need to require the `http`, `fs`, `path`, and `mime` libraries.

Use the `http` library to create a server.  The syntax is outlined in the [node.js synposis][node-js-synopsis]:

```javascript
var http = require('http');

http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello World\n');
}).listen(8080);

console.log('Server running at http://127.0.0.1.:8080/');
```

In the example, the callback passed to `createServer`  writes to the response and 
returns it by calling `response.end`.  *Instead* of dealing with the response inside the callback, 
our application should pass the request and response to a helper function that will act as a router.

The router should get the url from the request and do only one of three things:

 1. If the url is `/`, serve `public/index.html`.
 2. Otherwise, check if the url is a path to a file in our application.  If so, serve that file, rendering a `500` error if the file load fails.
 3. Lastly, render a `404` error if no matching file is found.
 
It is a good idea to split these three actions into additional helper methods.

### `public/index.html`

Add an `index.html` file to act as the root page for your app.  Include `jquery` to start with, 
and as we add client-side javascript files be sure to include them in the `<head>` element of your html page. 

Add some html to create a place to display messages and a form for inputing messages, but don't worry too much 
about styling or css.

Test out the static file serving: Start up the server with `node server.js` and visit `http://127.0.0.1:8080/`.
Also test the `error 404` message.

[node-js-synopsis]: http://nodejs.org/api/synopsis.html

## Phase 3: Basic Chat Functionality

We'll be using Socket.IO to implement chatroom functionality, and this involves starting up a Socket.IO server.

### `lib/chat_server.js`

Start a file for the Socket.IO server, and require the `socket.io` library.  You'll set up your server in this file and then export a `listen` function that can be called in the main `server.js` file.  The [Socket.IO documentation][socket-io-docs] has many examples of setting up a server.  Here's a good one:

```javascript
var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
```
In this example, the `http` server is created and passed the `handler` callback.  The `socket.io` server piggybacks off of the `app` server defined with `http`.  

The `socket.emit` command sends a message to the socket that just connected.  To send a message to all sockets, use `io.sockets.emit('message', { foo: 'bar' })`.  The first argument of `emit` is the name of the event it is emitting, and the second argument is data to send along with that event.

The callback for connections to the `socket.io` server is defined in the `io.sockets.on('connection'...` line.

In our application, we want listen for a `message` event and respond by broadcasting the `message` text to the chatroom.  Use the same `socket.on('event', callback)` pattern to set a callback for the `message` event that will be raised when a message is sent.

**TODO**: explain how this callback should work.

**TODO**: explain adding 

[socket-io-docs]: http://socket.io/#how-to-use

### `public/javascripts/chat.js`

Next, we need the client-side JavaScript to support sending messages to the server and displaying messages received from the server.

In a new file under the `public/javascripts` directory, make a class constructor `Chat` that saves a Socket.IO socket as an attribute.

Add a `sendMessage` method to the `Chat` class for transmitting a message to all users.  Use the `emit` method to emit the `message` event with the text of the message.

### `public/javascripts/chat_ui.js`

In a separate file we'll write the code to actually interact with the HTML user interface.  Write some helper functions that will:
 * get the message from the input form
 * send the message to other users (calling the `sendMessage` method of the Chat object,)
 * add it to the top of the display area for that user.
 
When dealing with untrusted data, (which is any data input or affecte by the user), you must be careful to escape any HTML or JavaScript characters.  Use the `jquery` `.text` rather than the `.html` method to add untrusted data to your page.  [This JSFiddle][escaping-with-jquery] demonstrates why.

Finally, bind the `submit` event of the `send-message` form to trigger your helper functions.  Remember to wrap the binding in a `$(document).ready` callback.
 
Also, remember to require the scripts `chat.js` and `chat_ui.js` in your `index.html` file, as well as requiring the `socket.io` library.

[escaping-with-jquery]: http://jsfiddle.net/b6PW2/

## Phase 4: Nicknames for Users

**TODO**

## Phase 5: Multiple Rooms

**TODO**

## Phase 6: Bonus Features

**TODO**

 * Caching files
 * CSS and styling (serve CSS and images as static files)
 * TODO: Add more bonus stuff
