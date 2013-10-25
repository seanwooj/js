# Journal

Design a Journal App using a Rails backend and Backbone on the
frontend. Try to do this without referring to the tutorial. Do the following before getting started:

* Add `gem 'backbone-on-rails'` to your Gemfile.
* Run `bundle install`
* Run `rails generate backbone:install --javascript`

## Phase I: Build a `Post` model

* Build a Rails model.
* **Don't worry about users or login right now**.
* Just have a title and a body.
* Next, write a Backbone.Model.
    * You probably don't need to write any code for this.
* Next, write a Backbone.Collection named `Posts`
    * set the `model` property so the collection knows what kind of
      objects it contains.
    * set the `url` property so it knows where to fetch/post `Post`s.
* In the Chrome Debugger, try using `Backbone.Collection#create` to
  create a new `Post` on the server.

## Phase II: Build a `PostsIndex` class

* Build a `PostsIndex` view class.
* It should take a `Collection` of `Post`s. It should list each of
  them in ul.
* Manually instantiate the `PostIndexView` and render it onto the
  page; you don't need a `Router` yet.
    * Don't worry about bootstrapping, just go ahead and make an AJAX
      call on page load to get the `Post`s.
* Add a delete button next to each.
    * Button should have a data-id attribute to store the id of the
      `Post` it deletes.
    * Set a CSS class for the delete button.
    * In the `events` attribute of the View, install a click handler
      on the delete button.
* Use `listenTo` to listen for the `"remove"` event on the
  underlying collection. Rerender the view in this case.
* Also go ahead and `listenTo`:
    * `"add"`
    * `"change:title"`
    * `"remove"`
    * `"reset"`

## Phase III: Build a `PostShow` class; write the Router

* Build a view class to show a post.
* Just show the title/body.
* Add a `Posts` Router class. You should have two routes:
    * `""`(empty string) : install the `PostsIndex` with all the `Posts`.
    * `posts/:id` to display a single `Post`.
* When constructing the `Posts` router, you should pass in the DOM
  element that it controls. It should swap content in and out of this
  element.
* Throw a "back" link on your `PostShow`.

## Phase IV: Build a `PostForm`

* Write a form for editing a post.
* In the router, get the `Post` object and pass it as the `model`
  property of the `PostForm`.
* On submit button click:
    * Set the attributes of the `Post`. Check out the
      [jQuery serialization][jquery-serialize] docs to extract values
      from the form.
    * Use `Model#set` to set the attributes of the `Post`.
    * Call `Model#save`.
    * Redirect back to the index page. Check out the
      [router docs][router-docs].
* On failure, re-render the form with errors.
    * Note that since you don't want to lose the user input, you may
      want to parameterize your form template with an attributes
      object.

[jquery-serialize]: https://github.com/appacademy/js-curriculum/blob/master/client-side-js/ajax-remote-forms.md
[router-docs]: http://backbonejs.org/#Router-navigate

### Phase IV and a half: build new objects with `PostForm`

* Add a `#/posts/new` route.
* In the route, build a new, blank `Post` object.
* Pass the new `Post` model to the `PostForm` view.
* Also pass the `Posts` collection to the `PostForm` (as attribute
  `collection`).
* On save, use `Model#isNew` to decide whether to:
    * Update: call `Model#save`
    * Create: call `Collection#create`
* On successful save, use `Backbone.history.navigate` to redirect to
  the posts index.

## Phase V: `listenTo`

* Right now we have one area which presents all the content.
* I would like to put a sidebar on the left that displays the index.
* Clicking on the links should swap out the content on the right.
* Probably want two divs: `sidebar` and `content`.
* On initialization, install a `PostsIndex` in the sidebar div;
  this view should never be removed by the Router. The sidebar is
  constant.
* There is one major thing to fix: when we create a new `Post` through
  the form, we don't update the `PostsIndex` to show the new
  `Post`.
* The way to accomplish this is to call `listenTo` to get the View to
  monitor the `PostsCollection` for events. Check the
  [Backbone.Collection docs][backbone-collection] for the collection
  events you can listen for.
* When one of these events fires, re-render the index view.

[backbone-collection]: http://backbonejs.org/#Collection

## Phase VI: Fancy edit

**TODO**: fix me up!

* To edit an article, user double clicks a particular section
  (like 'title' or 'body'). Double clicking the attribute should
  replace it with an input box containing the attribute's
  content. On blur of that input box, you should save the recently 
  edited attribute. [Here's a list of events!][js-events] you can bind to.
* You shouldn't just be rendering a whole edit form
  again. Instead, it should appear as if you are making changes
  in place.

[js-events]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events
