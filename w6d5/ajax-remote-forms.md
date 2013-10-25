# AJAX Remote Forms

Okay, cool kid, so you know how to use AJAX. Color me impressed.

Let's up our game. Let's write a form that, when the user clicks the
"submit" button, will submit the form data in the background.

The key is the jQuery [`serialize`] [jquery-serialize-doc] method. If
you have a form element (wrapped in jQuery, of course), you can call
the `serialize` method, which will extract the values from the `input`
tags contained in the `form`, and then serialize these to URL
encoding. As you know, URL encoding is the format that form data is
uploaded in.

Let's see it go!

```html
<!-- notice how I don't set the action/method on the form tag -->
<form id="cat-form">
  <input type="text" name="cat[name]">
  <input type="text" name="cat[color]">
  
  <input type="submit">
</form>

<script>
  $("#cat-form").on("submit", function (event) {
      // Lookup `preventDefault`; it stops the browser's default action,
      // which is to make a synchronous submission of the form.
      // http://api.jquery.com/category/events/event-object
      event.preventDefault();

      // Check out the `on` documentation: `this` gets set to the
      // submitted form.
      //
      // * http://api.jquery.com/on
      var formData = $(this).serialize();

      // If you filled out name "Gizmo" and color "Black", then
      // `formData == "cat%5Bname%5D=Gizmo&cat%5Bcolor%5D=Black"`.

      $.ajax({
        url: "/cats",
        type: "POST",
        data: formData,
        success: function () {
          console.log("Your callback here!");
        }
      });
    }
  );
</script>
```

[jquery-serialize-doc]: http://api.jquery.com/serialize

### Getting input values in JS `Object` format

It's great to get a URL encoded representation of the input values,
but it's also a little frustrating. URL encoding is difficult for us
to manipulate; just about the only thing we can do with it is submit
it to the server.

One pastability is to use the [serializeJSON][serializeJSON] jQuery
plug-in. It creates a JavaScript object following the Rails parameter
conventions.

[serializeJSON]: https://github.com/marioizquierdo/jquery.serializeJSON

## Authenticity token

What about the authenticity token? If you are using Rails, Rails will
automatically include a JavaScript library named `rails.js` (also
called jQuery UJS). Among a number of other things, this will install
a `$.ajaxPrefilter`; this filter gets run before every AJAX
request. In particular, the filter
([`rails.CSRFProtection`][rails-csrf-protection]), will look up the
CSRF token (which Rails stores in a `meta` element in the `head`), and
add this as a header to send with the request.

Should you ever explicitly need the CSRF token, you can do what
`rails.js` does to look it up:

    $('meta[name="csrf-token"]').attr('content');

[rails-csrf-protection]: https://github.com/rails/jquery-ujs/blob/master/src/rails.js#L55
