# Remote TodoLists app

We're going to make a single-page version of a todo list. This will
challenge your AJAX/jQuery skills. It will also motivate our
transition into the world of Backbone, in which we'll learn a more
structured way to write a SPA (single page app).

* Start again from the base AjaxDemo project from yesterday.
    * Ignore the `Secret` model today
* Build a `TodoList` model
    * List has a title
    * Build a `TodoItem` which is an individual item of the list.
* Write a `TodoListsController`
* Write the `TodoLists#index` page
    * Bootstrap all the `TodoList`s into the page.
        * Lookup the `#to_json(:include)` syntax to see how to also
          ship `TodoItem`s nested inside the `TodoList`.
        * On page load, load the bootstrapped data into JS and store
          them in a global variable (like `TASKS`).
* Show links to each of the `TodoList`s, but don't navigate to a new
  page. Instead, render a partial inside the current `index` page;
  this should display the `ListItem`s for the list.
    * To do this, store a `data-list-id` attribute in the link (so you
      can look up the items for the appropriate list).
    * You'll want an underscore template for formatting.
* Add a link that removes (hides) the "show" partial from the view.
* Next, write a remote form to create a new list. On success, it
  should add the newly created list to the global `TASKS` variable and
  also append it to the list of list links.
* Write a remote form so that users can create multiple list items for
  a list.
* Add remote delete buttons for each list and list item.
