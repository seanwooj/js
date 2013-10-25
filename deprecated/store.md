# Store

We're going to build a store!

We will focus on the client side of the store, so initially you may skip the admin side to manage items in the store, as well as user accounts for returning shoppers, and the sending of email confirmations.

To start you may use your `seeds.rb` file to create a bunch of items that may be bought in your store.

On every page there should be a sidebar with a shopping cart. This cart should contain its items, their quantity, and the total price. You should be able to remove single items from the cart, as well as empty the whole cart.

Anywhere an item is displayed there should be an "Add to cart" button. Clicking this button should update the shopping cart in the sidebar, as well as notify the user visually that an item has been added.

The updating and emptying of the cart should be done using Ajax requests, updating the html using jQuery.

Keep track of the shopping cart using the session in Rails.

The check out functionality can be very simple, using only a form to save the order details, as well as the associated items and their quantity.

The front page of the store should contain a carrousel with products, which shows a single featured item at a time, and then after several seconds moves to the side to show another item.


## Building a carrousel

One of the common implementations of a carrousel is as follows:

    <div>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </div>


The general idea is to use the outer `<div>` as a viewport in which we move around the `<ul>` to show individual `<li>` items. 

Using CSS, set the `width` and `height` property of the outer `<div>` to a fixed size. Set this same size on each `<li>` item. Set the same `height` on the `<ul>`, but set the `width` to the total of the width of all `<li>` items.

Next set the CSS property of `overflow: hidden` and `position: relative` on the outer `<div>`. This lets us use this element as a viewport in which we can move around the `<ul>`.

We want all the `<li>` elements to line up next to each other. We accomplish this by setting the `float: left` property. Because the `<ul>` has the total width of all `<li>` elements they should all be on the same line. If they wrap and span multiple lines, your `<ul>` is the wrong width.
  
Next we want to be able to move the `<ul>` showing the correct `<li>` item. Set the `position: absolute` and the `top: 0` as well as `left: 0` on the `<ul>`. This will position the first item in the visible viewport.

To move to the next item in your carrousel, all you have to do is change the `left` css property of the `<ul>`. This is where you start writing JavaScript.
  
The gist of the JavaScript is to have a `next` function, which changes the `left` position. To show item number `n` in the carrousel, you want to calculate the `left` position for the `<ul>` as `-1 * (n - 1) * "width of a single <li>"`.
  
Using the jQuery `.animate()` function instead of `.css()` to set the `left` position will let you animate the sliding. Make sure to check whether you're at the last item, and then have it loop around to the first item. Use a timer to fire off the `next` function to make it slide automatically.

###Carrousel extensions:
* Add next/previous buttons to carrousel
* Add pause on hover over carrousel
* Add Apple's famous little dots to indicate current position of carrousel
* Refactor your carrousel code into a [jQuery plugin][jquery-plugin] so you can call it like `$("div").myFancyCarrousel()`

[jquery-plugin]: http://docs.jquery.com/Plugins/Authoring

