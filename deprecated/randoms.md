# JS Quesitons

* What is `$(funciton () {})` for again? Wait until after page load or
  something?
* They're going to love `var _this = this;` for capture inside lambda
    * do people do this reflexively at the top of each method?
* What is `trigger` mean in backbone?
* This guy puts stuff in `window.*`; guess you would have wanted to
  declare a global `var MyApplication = {}` namespace to add to?
* Libs: require.js, underscore.js, jquery
* Templating: jquery templates, jqote

http://www.jamesyu.org/2011/01/27/cloudedit-a-backbone-js-tutorial-by-example/
http://coenraets.org/blog/2011/12/backbone-js-wine-cellar-tutorial-part-1-getting-started/




# ch2

* http://documentcloud.github.com/backbone/
* https://github.com/documentcloud/backbone/wiki/Tutorials%2C-blog-posts-and-example-sites
* https://peepcode.com/products/backbone-js
* http://recipeswithbackbone.com/

# ch3

* Rails not really MVC, since views not bound to models as observers
* Backbone has Models, Collections, Views, Templates and Routers
    * Models are familiar
    * Collections: "ordered set of models" ???
    * Router and view ???
    * Template

Typical setup:

* A request from a user comes in; the Rails router identifies what
  should handle the request, based on the URL.
* The Rails controller action to handle the request is called; some
  initial processing may be performed The Rails view template is
  rendered and returned to the user’s browser.
* The Rails view template will include Backbone initialization; usu-
  ally this is populating some Backbone collections as sets of
  Backbone models with JSON data provided by the Rails view.
* The Backbone router determines which of its methods should handle
  the display, based on the URL.
* The Backbone router calls that method; some initial processing may
  be performed, and one or more Backbone views are rendered.
* The Backbone view reads templates and uses Backbone models to render
  itself onto the page.

Actions can be taken at model, view, router levels, or request to
backend. Backend can be full reload request, ajax outside Backbone, or
models/collections communicating with the backend.

