// Client-side JavaScript

// 1. Why would the following code fail? What do you need to change with
//    script tags to make this function execute properly?

<script type="text/javascript">
  $(document).ready(function() {
    $('body').append('This is totally going to fail.');
  });
</script>
<script type="text/javascript"
           src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js">

// Intro to jQuery

// 1. What is the difference between the following jQuery selectors? Which would
//    you use to create a new div element?

$("div")

// vs

$("<div>")

// 2. Write a function that iterates over a set of div elements and
//    hides divs with class "hide-me", and changes the background color, border
//    and font of the others.
<div>I am a div</div>
<div>I am a div</div>
<div class="hide-me">I am a div</div>
<div>I am a div</div>
<div class="hide-me">I am a div</div>
<div class="hide-me">I am a div</div>
<div>I am a div</div>
<div>I am a div</div>

// 3. Given the following html markup, write a click listener that adds a new div
//    with the input value into the container.

<form class="user-input">
  <input type="text"></input>
  <button type="button">submit<button>
</form>
<div class="container">
</div>

// Asynchronous JavaScript

// 1. Write a function that changes the background color of the window
//    to a random color every 1000 ms.

// 2. Add two buttons -- start and stop -- that have click listeners to 
//    'start' and 'stop' the color changing function.

