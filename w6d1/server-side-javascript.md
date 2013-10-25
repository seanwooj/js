# Server-side JS

JavaScript's genesis comes from the browser; it was designed by
Netscape to add dynamic code inside Netscape Navigator. JavaScript
code was traditionally run by the user's browser, not the server.

In this respect, it was used very differently than Ruby. Programmers
didn't write stand-alone JavaScript programs (there wasn't a
`javascript my_script.js` command like `ruby my_script.rb`), nor was
there a REPL (no `irb` or `pry`). There are other differences rooted
in JS's history as a browser language that can make it frustrating for
general use.

In recent years, there has been more interest in bringing JavaScript
to the server. Our first JS programs won't feature the web browser at
all; they'll be a repeat of our first Ruby scripts.

We will use [node.js][node-js], a server-side JavaScript framework.

## Macports Installation

If you have MacPorts, installing should be as easy as

    sudo port install nodejs

This gives us access to the node REPL:

```
~$ node
> console.log("Hello student!");
Hello student!
undefined
```

We'll also want to install the node package manager at the same time:

    sudo port install npm

This is like RubyGems, it's used to download and use node.js
libraries.

## Executing scripts

We can run scripts in node.js with the greatest of ease:

```javascript
// script.js
for (var i = 0; i < 10; i++) {
  console.log("The greatest of ease!");
}
```

```
~$ node script.js
The greatest of ease!
The greatest of ease!
The greatest of ease!
The greatest of ease!
The greatest of ease!
The greatest of ease!
The greatest of ease!
The greatest of ease!
The greatest of ease!
The greatest of ease!
```

For debugging, I think the easiest way to run your programs is to use
the Chrome debugger. First, make a bogus HTML page to load your code:

```html
<html>
  <head>
    <script src="./lib1.js"></script>
    <script src="./lib2.js"></script>
  </head>
</html>
```

Then, after loading the page, use inspect element to gain access to
the JS console.

In the Sources tab you can look at the JS files. Click the number in
the gutter to add a debugging breakpoint.

**TODO**: demonstrate this process in a video.

[node-js]: http://nodejs.org/
