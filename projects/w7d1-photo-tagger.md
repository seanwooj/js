# Photo Tagger

Today, you'll be building a full-stack application that will enable a
user to add a photo and tag the user's friends in that photo. You'll
be dealing with multiple users, multiple photos, and multiple tags at
once.

Read through the whole project first to get a sense of what you'll be
building and how everything ties together. After that, if you still crave 
a big picture overview, read [this][pt-big-picture].

[pt-big-picture]: ../w7d1/photo-tagger-walkthrough.md

## Functionality Overview

### Photos Index Page

A user will login (clone the NewAuthDemo so you don't rewrite all the
auth stuff again). Upon login, they will be redirected to the photo
index page where they will see links to all the photos they have
previously added. On the index page, there should be a form to add a
new photo. It should simply take a title and URL to that photo (don't store
actually photos, just URLs). The form should be an AJAX form.

When the user clicks on a photo link, it should take them to the photo
show page.

### Photo Show Page (i.e. tagging page)

When a user is at a photo's show page, the photo should be enlarged
and centered on the page. The user should be able to click anywhere on
the photo and see a dropdown list of the user's friends at the current
mouse position (like Facebook). Upon clicking one of the names, the
tag should be saved and rendered onto the page.

## Phase I: Rails API

### Models

Start by building the requisite models with relevant associations,
validations, DB constraints and indices. You'll need:

* `User`, `Session` (already done from NewAuthDemo!)
* `Photo`
    * Keep an `owner_id` and an `url`.
    * Keep a `title` attribute.
    * Add validations, associations.
    * What DB index do you want?
* `PhotoTagging`
    * Keep a `user_id` and `photo_id`.
    * Keep `x_pos`, `y_pos` attributes to determine center position in
      the photo. Assume some fixed width/height of the tagging box.
    * You might want to add two DB indices (which?)
    * Add validations, associations. Add a `Photo#tagged_users`
      association in particular.

### API Layer

When thinking about the API layer, don't start with the controllers.
Start with your routes. Think about all the data needs of your
application and which routes will serve which needs. Think about
sensible nesting. In the next phase, your JavaScript models will be
interacting with these routes - those models are the consumers of the
routes your write.

Here are some routes we'll need:

* Ability to create a new Photo.
* Ability to fetch all the photos for a user.
    * Sounds like a nested resource.
* Ability to fetch all PhotoTaggings for a photo.
    * Also sounds like a nested resource.
* Ability to create a new PhotoTagging.

Only make API routes at this stage. You can create an API namespace
like so:

```ruby
PhotoTagger::Application.routes.draw do
  resources :users, :only => [:create, :new, :show]
  resource :session, :only => [:create, :destroy, :new]

  namespace "api", :defaults => { :format => :json } do
    # api routes go in here! controller is namespaced with `API::`,
    # lives in app/controllers/api

    # here's one resource for free!
    resources :photo_taggings, :only => [:create]
  end

  root :to => "users#show"
end
```

Then write your controllers to respond with JSON. Make it so that the
only route that responds to both HTML and JSON is your photos index
route. When creating objects, please be kind and return errors with
the appropriate status code (usually unprocessible entity) if
validation errors occur. On success, render the created object itself
(this is handy because this exposes the newly-assigned ID to the API
client).

One trick: please only let the user tag their own photos. Sounds like
the work for a `before_filter`!

## Phase II: First JavaScript Model: `Photo`

Okay, let's start building the JavaScript side of the world. The first
step is to start writing model classes; just like we have models on
the Rails side, we'll have JavaScript models, too.

Start by writing a `Photo` class; you can put your code in
`app/assets/javascripts/application.js`.

The `Photo` constructor should take in POJO (Plain-Old JavaScript
Object) data. For instance, I want to write:

```js
new Photo({
  id: 1,
  owner_id: 3,
  url: "http://placekitten.com/200/300"
  created_at: "2013-08-28 06:29:05",
  updated_at: "2013-08-28 06:29:05"
});
```
The easiest way to do this is to save a copy of the POJO to an
`attributes` instance variable. Write `get(attr_name)` and
`set(attr_name, val)` methods to manipulate attributes. The easiest
way to shallow dup a POJO is `_.extend`. In fact, now's a good time
to get acquainted with `_.extend`: [here's a small reading on its uses][underscore-extend].

[underscore-extend]: https://github.com/appacademy/js-curriculum/blob/master/w7d1/underscore-extend.md

Afer you do this bit, write a `Photo#create(callback)` method. This
should make an AJAX request to the appropriate API path, posting the
attributes. Go for the gold! NB: it would probably be nice if your
method ignored requests to `#create` on a `Photo` which already has an
`id`. You should invoke the callback on success.

```js
var photo = new Photo(formData);
photo.save(function (justSavedPhoto) {
  // stuff I want to do once the photo successfully saves
});
```

This is nice because now the user of the `Photo` class doesn't need to
make AJAX requests themselves. One last thing: merge the returned
attributes (most importantly the `id`) back into the `Photo`
attributes. You could (hint, hint!) use the `_.extend` method again
:-)

Next write a `Photo::fetchByUserId(userId, callback)` class
method. Again, make the the AJAX request for the user. Before calling
`callback`, turn the array of POJOs into `Photo` objects.

Just for today, don't bootstrap any data. We're going to focus on the
data communication layer for this phase. The first step in JavaScript
code organization will be to abstract out the data layer into
JavaScript models. Once you have this setup, the rest of your
JavaScript application should never deal with raw data (JSON objects)
or make AJAX requests to the server - it will only interact with your
model objects.

Okay, it's time to test it out! Go to the user show page and play
around with your `Photo` model! Create some `Photo`s and fetch some
`Photo`s! Use [placekitten](http://placekitten.com/), of course.

For convenience, add a `Photo::all` class property. Whenever you fetch
or create `Photo` objects, add them to the `Photo::all` array. This
way, all your fetched models are all accessible from a single place.

### Code organization

We're going to be making more model classes. Instead of writing all
your code in `app/assets/javascripts/application.js`, make a
subdirectory of `app/assets/javascripts` named `models`, and put a
file named `photo.js` in there. Add a `//= require_tree ./models` line
to your `application.js` manifest file. We'll talk about how the Asset
Pipeline will pull in these JavaScript files at a later date, but for
now it should just work.

Also, do us all a favor and namespace your JS code. Maybe a short name
like `PT` will appeal to you :-)

Good work, I'm so proud of you!

## Phase III: Photos index

### Writing a blank Rails view

Okay! Let's actually start using our API! Write a `StaticPages`
controller. Add a `root` action. In the routes file, set `root :to =>
"static_pages#root"`.

You can write a mostly empty page. I just stuck one empty `div` with
CSS id `content` in the view. Our content will be rendered into this
div.

### Writing our first JS View class

Okay, let's write JavaScript code that will display a list of links
for each photo. This JavaScript code, which operates somewhat like a
Rails controller, is instead called a **View** in the JS world. in the
JS world, we use the word **template** to refer to a file like ERB.

Make a new directory in `app/assets/javascripts` named `views`. Write
a `photos_list_view.js` file (again, add this directory to your
manifest). Begin writing a `PhotosListView` class.

On construction, have the `PhotosListView` build an empty `div` (name
this instance variable `$el`), but don't insert it in the DOM or put
any content in it.

Write a method `#render` that:

0. Clears out any existing content in `$el`.
0. Builds a `ul` and places it in `$el`.
0. One-by-one, builds an `li` for each of the `Photo::all` (just place
   the title inside), filling the `ul`.
0. Returns the view itself to the caller.

Okay, now, the last thing to do is to go to `application.js` and write
a function, `PT.initialize`, that will:

0. Fetch the `Photo`s for the current user (Hold on a second to read
   how to get the current user's id).
0. Build a `PhotosListView`.
0. Call `#render`; take the `$el` and insert it into `div#content`.

Call `PT.initialize` when the page is done loading. Do this in the
script tag of your `root` view.

In your ERB template, you can go ahead and set a variable called
`CURRENT_USER_ID`. The only info you need to bootstrap is this single
`id`, and you can put this directly into the JS script that calls
`PT.initialize`.

## Phase IV: Uploading new Photos

### Build PhotoFormView, use EJS

Let's add a form to the page so that users can create new `Photo`s.

Begin writing a new view class, `PhotoFormView`. Write it in a new
file in `views/photo_form_view.js`.

As before, on construction of the view, create an empty `div` tag and
save it to an instance variable (`$el`).

Okay, it's time for the `render` method. Last time, we built the HTML
in JavaScript using jQuery. This time, instead, let's use an
underscore template. I want to avoid the obnoxiousness of hiding
templates in `script` tags, so let's learn how to do this the right
way.

First, install the `ejs` (Embedded JavaScript) gem. Next, create a
directory named `app/assets/templates`. Write a template named
`photo_form.jst.ejs`; write it in Underscore format. Your form should
be somewhat simple; you need only `url` and `title` inputs.

We need the asset pipeline to compile the templates, so add `//=
require_tree ../templates` to `application.js`. Since the `templates`
folder will be outside of the `assets/javascripts` folder, you will need
to tell rails about it explicitly in `config/application.rb` so it's
loaded with your assets i.e.: `config.assets.paths << "app/assets/templates"`.

Rails does not usually expect assets to be in the `app/assets/templates`
directory, so in `config/application.rb`, add `config.assets.paths <<
"app/assets/templates"` to the end of the configuration.

The pipeline will
compile the underscore templates to JavaScript functions. These
functions are made available in a namespace named `JST` (for
JavaScript Templates). To access a template function, write
`JST["template_name"]`. In our case, we want `JST["photo_form"]`.
Note that this will return the template function.

Let's use the template in our `PhotoFormView#render` method. Execute
the template and inject the result into `$el`. As before return the
view itself from `render`.

### Responding to submit events

Let's use our form view and place it on the page. In `application.js`,
when you create a `PhotoListView`, also create a `PhotoFormView` and
display that, too, below the list.

Okay, great, but we haven't done one thing: we haven't handled what
happens when the user submits the form. Let's add a
`PhotoFormView#submit(event)` method. In the constructor, bind submit
events on `form` in `$el` so that they call `submit`. Because `render`
will not have been called in the constructor, no form elements will
exist yet, so you need to use event delegation.

`submit` should use `jquery.serializeJSON` to package up the form. It
should build a new `Photo` object, and then it should call
`Photo#create`. As ever, you'll need to download `serializeJSON`, add
it to `vendor/assets/javascripts`, and update the manifest file.

Take this opportunity to star the `jquery.serializeJSON` repo (both
pairs!). Let's be randomly nice to this guy for his wonderful,
underappreciated library. Good deed, you! Instant karma! :-)

### Updating the PhotosListView: our options

Test out your form. Even if it is working, you won't see any change in
the page after you submit the form. Your create request for the
`Photo` is sent to the API in the background, but nothing refreshses
to show the newly created post.

Ideally, we would like the `PhotosListView` to re-render itself, so
that it can display the new `Photo` in the list.

There are a number of ways we could do this. One ugly way would be to
create a global variable, `PHOTOS_LIST_VIEW`, and then have the
`PhotoFormView` call the `#render` method on the global variable. A
less terrible but still clumsy way would be to pass in the
`PhotosListView` to the `PhotoFormView`'s constructor; this would
accomplish the same task, but eliminate the global variable.

This is still ugly, because it tightly couples the `PhotosListView`
and `PhotoFormView` together (the form view holds a reference to a
list view to refresh). Somewhat better is if we were to pass a
callback function to the `PhotoFormView`; the callback could invoke
the `PhotosListView#render`, but the `PhotoFormView` could remain
agnostic about what the callback does.

We will do none of these. We'll use a solution that involves
**events** and **triggering**.

### Adding events to the `Photo` class

Here's what we want to do in a nutshell:

* Modify the `Photo` class so we can **register** callbacks that wait for
  **events** to be **triggered**. An example of an event is `"add"`,
  which would be triggered when a new `Photo` is saved.
* `PhotosListView` should register a callback that waits for the add
  event. The callback should re-render the view.
* Now, when the `PhotoFormView` creates a new `Photo`, the add event
  will be trigerred, and the `PhotosListView` will know to re-draw
  itself!

Add a class property to `Photo` named `_events`. This will store a map
between: event names and arrays of callbacks to invoke. It can start
out empty.

Write a class method named `Photo::on(eventName, callback)`. This
should add to the array of callbacks for `eventName`.

Write a method `Photo::trigger(eventName)` that will **fire** (call)
all the callbacks for the `eventName`.

Lastly, modify `Photo#create` to trigger the `"add"` event. Modify
`PhotosListView` to listen for `"add"` events; call `render` on any
add.

Tada! Now your `PhotosListView` should automatically update when the
`PhotoFormView` is submitted!

## Phase V: `PhotoDetailView`

### First steps

Okay, it's time to start tagging photos. Write a `PhotoDetailView`
class. When constructing a `PhotoDetailView`, pass in the photo to
display. The job of the detail view is to (a) display the photo, and
(b) to wait for clicks in the image area to pop-up a tagging box (that
will be another view, `TagSelectView`.

As ever, construct a blank div for `$el`. Store the passed photo in a
`photo` attribute. Write a `photo_detail.jst.ejs` template; it
probably just needs an `h1` for the title and an `img` tag for the
photo. Write a simple `render` method.

Make it so!

### Transitioning views

Okay; let's edit our `PhotosListView` to list links for each `photo`;
clicking one should change the "page" to show the `PhotoDetailView`.

Put a link in each `li`. Give it a `data-id` attribute; put the
photo's id here. You can use `"#"` as a blank `href`; we don't
actually want these links to trigger a page load.

Lastly, install a click handler for `a` tags in the constructor
function. Use event delegation FTW. Write a handler method
`PhotosListView#showDetail(event)`. At first, just prevent the default
action and log the event to make sure things are working.

Next, let's modify `application.js` for a second. In `PT.initialize`,
we constructed a `PhotosListView` and `PhotoFormView`. Let's move that
out into a helper method: `PT.showPhotosIndex`. Your `PT.initialize`
can just call this method to start.

Next, write a method `PT.showPhotoDetail(photo)`. This should
construct a `PhotoDetailView` and place it in the page. This is the
function you should call from the click handler in
`PhotosListView`. Use the `data-id` stored in the `a` tag to lookup
the proper photo (want to write a `Photo::find` method now?), and then
pass it to `showPhotoDetail`.

At the same time, add a back button to your `PhotoDetailView` to
navigate back to the `PhotosListView`.

## Phase VI: Tagging I: red boxes!

The next step is to start listening for clicks inside the image, so
that we can pop-up a box that gives the user a list of users to select
to tag.

Install a click handler on the image (again, do this in the
constructor with event delegation). Write a handler,
`popTagSelectView(event`. For now, just `console.log` the `offsetX`
and `offsetY` properties of the event.

Check that the handler is responding to clicks. The closer you click
to the top left, the smaller the x and y coordinates should be.

Our first goal will be to draw a little box around that center
coordinate like Facebook does.

### A little math

Okay, using event's `offsetX` and `offsetY` properties, we can get the
click's location relative to the top-left of the `img`. We want to add
a `div` for the photo-tag centered at this position.

We need to add the photo-tag div to the element containing the
`img`. We need to translate the offset inside `img` to an offset in
the `div` containing the `img`.

To do this, we take the offset of the click event and add it to the
`$#position` of the `img` tag.

In your `popTagSelectView` method, create a `div`, and set the
CSS class to `photo-tag`. Use the `$#css` method to set the
positioning of the div to `"absolute"`, which means you specify an
offset relative to the containing element. Specify `left` and `top` as
calculated from above.

In your `app/assets/stylesheets/application.css` file, style a div of
this class with width/height to 100px, and a red border of 5px. That
looks pretty good.

Try clicking around, you should see red boxes appearing. You may be
annoyed that the box is not centered around your click; do a little
more math and fix this. Don't worry about the clipping where the box
edges appear outside the image. That's fine for now.

### `TagSelectView`

Right now we're just drawing silly red boxes on the screen. We want to
write an actual view that will present a list of users. I called this
`TagSelectView`. I passed the constructor function (a) the `Photo`
object to tag and (b) the click event that occurred.

* the `Photo` to tag,
* the click event.

As usual, construct a div for `$el`. Compute the appropriate top-left
point, and set CSS positioning properties as before. In the `render`
method, create an inner div with the `photo-tag` class applied.
Rewrite your `PhotoDetailView#popTagSelectView` method to construct a
new `TagSelectView`, render it, and insert the `$el`.

## Phase VII: Tagging II: Selecting users

Last stage!

### JS `PhotoTagging` model

First off, write a `PhotoTagging` JS model class. Because of the many
commonalities, I copied the `photo.js` file and just made edits around
the edges. In particular, I modified `fetchByUserId` to
`fetchByPhotoId`.

Test that you can create `PhotoTagging`s through the `#create` method.

### Bootstrap `User.all` into the view

Rather than make a proper `User` model, let's just be lazy and
bootstrap `var USERS = <%= User.all.to_json.html_safe %>` directly.

### Modify `TagSelectView` to present users

Write an underscore template, `photo_tag_options.jst.ejs`, that builds
a `ul` presenting one user for each li. In addition to the tag box,
render the template as part of `TagSelectView#render` and place it to
the right of the tag box.

To make the tag options appear to the right of the photo box, here's
the CSS I used:

```
div.photo-tag {
  width: 100px;
  height: 100px;
  border: solid red 5px;
  float: left;
}

ul.tag-options {
  float: left;
  list-style: none;
  margin: 0px;
  padding: 0px;
}

ul.tag-options li {
  border: solid red 5px;
  color: red;
  height: 20px;
  width: 100px;
}
```

Here's what mine ended up [looking like](../images/photo-tagger.jpg).

Lastly, install a click handler (`selectTagOption`) that waits for a
click on one of the tag options. This should (a) create a
`PhotoTagging` and (b) dismiss the view by calling the `$#remove`
method. Check to make sure the server creates this.

## Phase VIII: Bonus

* We don't ever display our tags. Create a `PhotoTagBoxView`
  class. When rendering `PhotoDetailView`, render the necessary
  `PhotoTagBoxView`s.
* Right now, if we click on the image, we pop up a `TagSelectView`. If
  we click somewhere else on the image, we pop up **a second**
  `TagSelectView`. Instead, I would like to: (a) store any current
  `TagSelectView` in a `PhotoDetailView` instance variable, (b) if a
  click occurs in the detail view, shut down the existing
  `TagSelectView` before creating a new one.
* Refactor `Photo` and `PhotoTagging` so they both inherit common
  `Model` methods.
* Add a destroy route/action for `API::PhotosController`. Add a
  `Photo#destroy` method to your JS models. Add an appropriate button.
* Add a refresh button that will go back to the server and try to
  fetch the latest tags submitted by other users.
