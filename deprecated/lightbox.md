# Lightbox

We're going to work on creating an image lightbox that takes the URL of an `a`'s `href` and creates a pop-up within the page that displays the image, ala [this site][this]. Don't worry about all of the fancy effects. For now, we're going to want it to get the image drom the specified url, center itself on the page, and have a link to close the lightbox.

## Part 1
Create a new HTML document. You're going to want to use jQuery in this project, so either link to the CDN (google jquery CDN), or download a copy of jQuery and place it in your project folder.

Let's think about how we want to organize our HTML page. Do we want to create a new modal every time we click on the link to display it, or do we want to have it always present on the page, but hidden? Either way will be valid, but they both have their pros and cons. Think them out.

For this part, let's not worry about centering the lightbox. Let's simply make a modal element appear and disappear. Give your modal element a min-width and height, as well as a background color so you can differentiate between the background and the modal. jQuery will have a number of methods for dealing with showing or hiding a DOM element.

## Part 2
Use `css position` and jQuery to center the modal. There are a few ways you could go about doing this. As a hint, how would you get the center position (in pixels) of your window. Use that as a basis for centering your modal div.

## Part 3
How are you going to get the url for the image and set it to the modal's content? jQuery's `attr` method will be particularly useful here for pulling data from a DOM element.

[this]: http://lokeshdhakar.com/projects/lightbox2/