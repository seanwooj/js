# Asynchronous Client-side Code

When your JavaScript code is being run in the browser, it blocks the
browser from doing other things. This includes running other JS code,
but also making new browser requests, rendering HTML, or even
scrolling. For instance, try this:

```html
<html>
  <body>
    <script>
      while (true) {
        console.log("Help! I'm stuck in a loop!");
      }
    </script>

    <h1>This heading never appears!</h1>
  </body>
</html>
```

Your tab should be entirely locked up; you'll have to close it. Notice
the `h1` tag is never rendered, because the browser stopped rendering
the HTML to run the script, but the script never finished!

There is one thing that you won't be able to do: execute a traditional
game loop:

```javascript
while (true) {
  // in many other languages (including Ruby), we can `sleep` to pause
  // the game for a second and then resume. In JS there is no `sleep`.
  sleep(1); // wrong

  // take a game step once per sec
  game.advanceState();
}
```

There is no sleep method in JS; it wouldn't make sense anyway, because
you mustn't write code that won't return promptly. However, JS and the
browser give you a way around this:

```javascript
window.setInterval(function () {
  // call this once per second
  game.advanceState();
}, 1000);

console.log("Timer set!");
```

The `window.setInterval` method schedules a timer that fires once
every 1000 milliseconds. When the timer fires, our function is
called. This approximates a loop, but it is
non-blocking. `setInterval` runs in the blink of an eye; it merely
schedules a timer, to be fired by the browser later. So
`console.log("Timer set!")` is called instantly.

If you wonder how you could possibly write `window.setInterval` in
pure JS, the answer is that you can't. The browser needs to provide
that functionality. This is an example of a browser API that allows us
to do things that pure JavaScript can't express. We can **ask** the
browser to set a timer through the JavaScript API, but we couldn't
write it ourself in JavaScript.

## Callbacks and event handlers

An idiom from our Ruby game code is to enter a loop, request user
input, and then pass the input to the game. In JS, we can do this from
a prompt like so:

```javascript
while (true) {
  // wait for input
  var userInput = window.prompt();
  
  game.makeMove(userInput);
}
```

This pops up an input box for the user to type in text. But because
the `prompt` waits for user input, it blocks the *entire*
page. Nothing at all can happen (they can't even scroll). This is bad.

What if we want to enter text into a normal text input field and press
a button? `prompt` doesn't let us do this.

Input in JavaScript is typically handled **asynchronously**: we will
register (or **bind**) a function (called a **handler**) to be called
by the browser when an event occurs. Here's an example:

```html
<html>
<head>
  <title>A page for you!</title>

  <script type="application/javascript"
           src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js">
  </script>

  <script type="application/javascript">
    $(function () {
      // uses jQuery to find HTML elements by id.
      var submitButton = $('#submit-button');
      var textField = $('#text-field');
    
      // installs a "click handler" on the submit button; the callback
      // gets run when the button is clicked.
      submitButton.on('click', function () {
        // grab input text from the text field.
        var input = textField.val();
        // reset text field to blank
        textField.val("")
    
        alert("You typed: " + input);
      });
    });
  </script>
</head>

<body>
  <input type="text" id="text-field" value="">
  <button id="submit-button">Submit me!</button>
</body>
</html>
```

jQuery's `on` method asks the browser to call the passed function when
a click event occurs on the submit button. This function is called the
handler.

Paste this in the browser and try it out!

## Resources

* https://developer.mozilla.org/en-US/docs/DOM/window.setInterval
* http://recurial.com/programming/understanding-callback-functions-in-javascript
* https://developer.mozilla.org/en-US/docs/DOM/window.prompt
* http://api.jquery.com/on/
