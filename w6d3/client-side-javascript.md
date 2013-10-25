# Client-side JavaScript

We've seen how to use node.js to run our code server-side as a script
or in a REPL. Now it's time to learn how to run our code in the
browser.

We should remember: the browser is a different *environment* from
node.js. Some things from node.js won't work in the browser
(especially `require`), while some things we can only do in the
browser (manipulate the HTML page, prompt the user for input).

## Loading JavaScript in a web page

```html
<html>
<head>
  <title>A page for you!</title>
</head>

<body>
  <div id="content">
  </div>

  <!-- first load the jQuery library hosted by Google -->
  <script type="application/javascript"
           src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js">
  </script>
  <!-- then load our own app.js code -->
  <script type="application/javascript" src="./app.js"></script>
</body>
</html>                              
```

Whenever the browser encounters a `script` tag, it will make a request
for the javascript source and download it. It will then execute the
JavaScript code, and continue reading the HTML.

Here we first load jQuery, which is a library meant to make HTML
manipulation, event handling (mouse clicks, for instance), and AJAX
requests (background web requests) easy. We'll learn more about it
later.

Then we load our own `app.js`. Here's what I cooked up:

```javascript
// dynamically inject creepy Andy Warhol photo
$("#content").append('<img src="http://upload.wikimedia.org/wikipedia/commons/2/2b/Andy_Warhol_by_Jack_Mitchell.jpg">');

function addElvis () {
  // a little too much Elvis
  $("#content").append('<img src="http://upload.wikimedia.org/wikipedia/en/b/be/Eight_Elvises.jpg">');
}

// repeatedly call addElvis once every second.
window.setInterval(addElvis, 1000);
```

Paste the code into your own `example.html` and `app.js` files and try
it out in your browser! Collect your reward of Warhols and Elvises!
