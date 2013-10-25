# Intro to jQuery

## Part 1: The Basics

### Let's talk about `$`

The jQuery library provides a very important function; `jQuery`. This
gets aliased to `$` for ease of typing. You can see that this is true
by taking a quick look at the jQuery source code:

```javascript
// Expose jQuery to the global object
window.jQuery = window.$ = jQuery;
```

Why do we care? Well, jQuery is one of those things that feels like
magic. Especially with the cool `$` notation. So, let's nip that in
the bud early, and understand that `$` is nothing more than a
function.

### Getting started

It's common to wait for the document to get to a 'ready' state before
trying to manipulate it. We do that with `$(document).ready(fn)`. It
takes an anonymous function within which binding portions of our
script will run.

```javascript
$(document).ready(function() {
  console.log("Hello world");
});
```

We can use a bit of shorthand here:

```javascript
$(function() {
  console.log("Hello world");
});
```

I mentioned that you want 'binding portions of the script' in
`ready`. What do I mean by that? Well, it is safe to have classes,
prototypes, and etc. to be declared outside of `ready`. However, any
functions that modify the DOM or bind elements should wait till the
document finishes loading.

### Grab an element

Grabbing an element is easy peasy in jQuery. Just pass the appropriate
CSS selector to the `$` function:

```javascript
$('body'); // get the body
$('header'); // get the header
$('footer'); // you guessed it, get the footer
```

What if there is more than one element that matches the selector? Use
the appropriate CSS selector.

```javascript
// grab *all* elements that match the selector, and wrap them up in a
// single jQuery object
$('div'); 
```

What if I want to select by class name or by ID?

```javascript
$('.post'); // grab all elements that have the class 'post'
$('#profile-pic'); // grab the one element that has the ID 'profile-pic'
```

### Make a new element

Making a new element is also easy. Check it out:

```javascript
$('<div>content</div>') // BAM! I just made a div.
```

Basically, to make a new element, you just pass an HTML snippet (in a
string) to `$`. Awesome!

But wait! There's no point in just making a new element. At some
point, we want to add it to the DOM. We can do this by inserting the
element relative to another.

```javascript
$('#container').append(new_element); // Add new_element as the last child of #container
$('#container').prepend(new_element); // Add new_element as the first child of #container
$('#container').after(new_element); // Add new_element after #container
$('#container').before(new_element); // Add new_element before #container
```

### Getters and setters

Getters and setters in jQuery are interesting. Often, the getter and
the setter are the exact same function. Let's see how this works using
the method, `html`.

```javascript
// This is the getter. It grabs the HTML contents of #profile:
$('#profile').html();

// This is the setter. It sets the HTML contents of #profile:
$('#profile').html('<div>This is sooo cool</div>');
```

Note how both the getter and setter are the same function, but they do
different things based on its arguments.

There are some methods that are just setters. `empty` is one of
them. The following:

```javascript
$('#profile').empty();
```

will completely erase the contents of '#profile'. Note that '#profile'
itself will still exist. Just its contents are no more. If you want to
remove '#profile', you can call `remove`:

```javascript
$('#profile').remove(); // #profile is no more!
```

### Implicit iteration

Let's say you end up grabbing a bunch of elements, as so:

```javascript
$('.post'); // Grab all elements with the CSS class 'post'
```

Now, you use a setter on the result. What happens?

```javascript
$('.post').html('<p>This is a post</p>');
```

Well, jQuery has this thing called 'implicit iteration'. It will apply
the setter to all elements returned by the selection. In this example,
all elements with the CSS class 'post' will have its content set to
"This is a post".

### Explicit iteration

Implicit iteration is great and all, but sometimes it just doesn't cut
it. In those cases, we need to be explicit. We can iterate on the
results of a selection using `each`. Check it out:

```javascript
$('.post').each(function(index, element) {
  $(element).prepend('<h1>This is post #' + index + '</h1>');
});
```

**QUESTION** Why wouldn't implicit iteration work here?

Note that the `element` that is passed in is a regular old DOM
element; it is not jQuery wrapped. To be able to use the cool jQuery
methods, we re-wrap the element with `$(element)`. This is yet another
way to call the `$` function!

### Chaining

Remember in Ruby, we could chain together methods? Something like this:

```ruby
[4,7,3,5,2].sort.map{ |el| el * 2}.inject(:+)
```

You can do something similar in jQuery. The usage looks pretty similar
too:

```javascript
$('.post').find('div').html('these are some divs');
```

This works because each jQuery method returns a result set so that we
can apply further jQuery methods.

Be careful though -- excessive chaining is just as bad in JavaScript
as it is in Ruby. It makes the code harder to read, and difficult to
debug.

## Part 2: Traversing the DOM

### Filtering

Let's say we want to narrow our selection down a bit. We can
accomplish this by filtering out results. There are three methods we
can use:

0. `filter`: only include items which match the filter
0. `not`: only include items that don't match the filter
0. `has`: only include items that contain the filter

Here is how you would use them:

```javascript
var filterExample = $('.post').filter('.important'); // grab '.post' items that have a class '.important'
var notExample = $('.post').not('.old'); // grab '.post' items that do not also have a class '.old'
var hasExample = $('.post').has('div'); // grab '.post' items that contain a div
```

### Other super useful methods

There are plenty of other ways to make additional selections on an
initial one.

```javascript
var firstPost = $('.post').first(); // get the first post
var allDivs = $('.post').find('div'); // grab all the divs from all the posts

var siblings = firstPost.siblings(); // grab all the siblings of the firstPost
var nextSibling = firstPost.next(); // grab the next sibling
var parent = firstPost.parent(); // grab the parent to firstPost
var children = firstPost.children(); // grab all the children of firstPost
var parentsWithClass = firstPost.parents('.upper'); // grab all the 'upper' class parents of firstPost
var embarrasingAncestors = firstPost.ancestors('.no'); // grab all the ancestors with 'no' class
```

## Part 3: Being Manipulative

### Adding and Removing Classes

The add class and remove class methods are (appropriately named)
`addClass` and `removeClass`. You can also easily swap elements' class
using `toggleClass`. Observe:

```javascript
$('#title').addClass('large');
$('#title').removeClass('boring');

// Swap a class on/off:
$('#profile').toggleClass('edit-mode');
```

### Changing styles directly

If you really want, you can also change the styling of elements
directly using `css`. `css` can be both a getter and a setter. As a
getter, it takes in a property name, passed as a string. As a setter,
it takes both a property name, and a value. The value can either be an
integer or a string (in the case where the value might be something
like '20px');

```javascript
var tmargin = $('.post').first().css('margin-top'); // get the top margin of the element
var newMargin = parseInt(tmargin) + 40 + 'px';
$('.post').first.css('margin-top', newMargin); // set the top margin of the element
```

You can also change multiple css properties at once by grouping them in an object:

```javascript
$('#title').css({
  'font-size':'100px',
  'color':'blue'
});
```

**IMPORTANT**: Don't use `css` that much. The better thing to do is to
hold your different styles in css classes, and just switch the classes
as needed. Seriously, don't do something like

```javascript
// make the post look highlighted:
$('.post').first().css({
  'color':'red',
  'border':'2px solid red',
  'background':'yellow',
  'box-shadow':'0 0 20px 2px pink',
  'font-family':'comic-sans'
});
```

because Niranjan will cry. You are better off putting the above into a
css class of its own (say '.highlight') and toggling it instead. Like
so:

```javascript
// make the post look highlighted:
$('.post').first().toggleClass('highlight');
```

### Change values

You can also change the value of an element quite easily.

```javascript
$('select').val('10'); // change all the selects to have a value of 10
```

### Change ANY attribute

That's right, you can change *anything* (terms and conditions
apply). Use `attr` as follows:

```javascript
$('a').first().attr('href', 'https://www.supersecret.com/crazy');
```

## Part 4: Events and Binding

The most exciting part about JavaScript is having the page respond to
user interactions in real time. jQuery makes this super simple with
the `on` method:

```javascript
$('.clickme').on("click", function (event) {
  alert("Good job, you clicked me!");
});
```

In the example above, I used an anonymous function. You can also
define a function explicitly, and pass that.

```javascript
var mouseHandler = function(event) {
  alert("You triggered a mouse handler.");
};

$('.touchme').on("mouseover", mouseHandler);
```

There are many events you can listen to with `on`:

* click
* keydown, keypress, keyup
* mouseover, mouseout, mouseenter, mouseleave
* scroll
* focus
* blur
* resize

There is an `off` method, which can be used to **unbind** the event
you just bound.

```javascript
// Bind '.clickme' to a click event:
$('.clickme').on('click', function() {
  alert("Good job, you clicked me!");
})

// Unbind the event:
$('.clickme').off('click');

// Clicking the element no longer does anything.
```

### Event Delegation

Let's say you have a `ul.cats` filled with `li.cat` items. You want to
install a handler for when a user clicks on one. You might write this:

```javascript
$(function () {
  $("li.cat").on("click", function () {
    // handle a cat click
  });
});
```

This code will wait until the DOM loads and then install the handler
on each of the list items. Very cool. However, let's say some
JavaScript adds even more cats to the list. These new `li` elements
did not exist at the time the document was loaded, so the click
handler has not been bound to them.

jQuery gives us a simple way to deal with the problem:

```javascript
$(function () {
  $("ul.cats").on("click", "li.cat", function () {
    // handle a cat click
  });
});
```

This installs the click handler **on the `ul.cats`** element. However,
the click handler will only be called if an `li.cat` inside the
`ul.cats` is clicked. Other clicks on `ul.cats` will be ignored.

Because the click handler is installed on the existing `ul.cats`
element, any new `li.cats` elements will have their click events
handled.

## Resources

* [jQuery Documentation](http://api.jquery.com/)
* [jQuery Cheatsheet](http://oscarotero.com/jquery/)
