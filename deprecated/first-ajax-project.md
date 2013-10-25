# DreamJournal App

## Phase I

### `dream.js`
* Write a `Dream` JS model class:
    * Write a `Dream#save` model method.
    * Write a `Dream::refresh` class method.
* Create a `DreamIndexView`
    * It should query the server for all the current `Dream`s.
    * It should have a refresh button. On refresh, re-render the
      `DreamIndexView`.
    * On instantiation, you should pass it a function that will be
      called when a dream is selected.
* Create a `DreamView` view class; it should be constructed with a
  `Dream` and a DOM element. It should inject the dream content into
  the DOM el.

### `index.html` and `app.js`
* Add divs to hold your index and the main content.
* Instantiate an index view. Pass it a function which instantiates a
  `DreamView` to display the dream.

### form

* Write a `DreamFormView` class.
    * It should be passed an element (presumably a `div`) in which it
      will insert a text area and button to create a new dream.
    * It should also be passed a (possibly blank) `Dream` object 
    * The submit button should submit the form via AJAX.
        * Disable the submit button until the AJAX request returns.
        * Only if the submission is successful, clear the form.

## Phase II

* Add a `Theme` model to capture dream tropes (flying, being chased,
  etc).
* A `Dream` should have many `Theme`s. You should modify your form to
  display them.
* Add a text field to `DreamFormView`. As you type in the field,
  interactively match the name of `Dream` theme (have a ul somewhere
  which lists the first three matching `Theme`s). When the user hits
  enter, select the top `Theme` and add it to the `Dream`.

## Phase III

* Add a method to edit existing dream objects.


