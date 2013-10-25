## JavaScript MVC
In preparation for learning Backbone.js, we're going to write our own mini MVC pattern in JavaScript. JavaScript models function exactly like models in Rails; JavaScript views, however, are most like Rails' controllers. JavaScript templates are most like Rails' views. Here's an outline of the models and views we'll write.

### Models
We'll be writing the following JS models; we'll make them imitate Rails models by writing class methods like `find`, and instance methods like `save`.

* `Photo`
* `PhotoTagging`

If written properly, you'll be able to open up Chrome's JavaScript console and type:

```javascript
var photo = new PT.Photo({title: "A title!", url: "some_url"});

photo.save(some_callback_here)
```

This should insert a row into your database, and execute `some_callback_here`. Moreover, the actually `POST` to the Rails API will be via AJAX, so the end user won't see page reloads when creating new `Photo`s.

### Views
We'll be writing the following JS "views"; we'll make them imitate Rails controllers by writing instance methods like `render`.

* `PhotosListView`
* `PhotoDetailView`
* `PhotoFormView`
* `TagSelectView`

The instance method `render` will take care of actually changing the html on the page the user is looking at.

## Functionality Walkthrough

### Photos Index Page (`PhotoListView`)

A user will login; upon login, they will be redirected to the photo index page. On this page, there should be a form to add a new photo. It should have inputs for a title and a URL. Upon submission, this form will instantiate a new **JavaScript** `Photo` object, and call the `save` method on that object.

The Photos Index Page will also have a list of links to each of the User's photos. When a user clicks a photo link, we will instantiate a new **JavaScript** `PhotoDetailView` and call the `render` method on that object. The `render` method will actually change the page's HTML _without_ loading a new page, i.e. `render` will perform DOM changes on the fly.

### Photo Show Page (`PhotoDetailView`)

This page is what will be created by the `render` method of `PhotoDetailView`.

When a user is on a photo's show page, the photo should be enlarged and centered on the page. The user should be able to click anywhere on the photo and see a dropdown list of the user's friends at the current mouse position. Again, we will do this by instantiating a **JavaScript** `TagSelectView` to add HTML to the page on the fly, without reloading anything. Then, to save a tagging, we will instantiate a new **JavaScript** `PhotoTagging` object, assign it the correct attributes, and call `save` on that object to persist to the database.