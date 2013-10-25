# Client Side Model - View - *

As you well know by now, Rails is a server side Model - View - Controller framework. As it turns out, it is often times helpful to have a similar organizational pattern on the client side - i.e. in the browser, through JavaScript.

It is particularly helpful when we are building a _web application_ rather than just a _web site_. Though the lines are becoming more and more blurry, applications tend to feel more like native operating system programs; for example, Spotify's [web player][spotify-web] is a good example of a web application.

Web applications differ from web sites because a large amount of logic is being performed client side. This is in contrast to how we normally use Rails, i.e. process everything server side, then render a single page for the end user. As more and more logic needs to be performed client side, it becomes important to organize our code. This is why we'd like to have a client side Model - View - * pattern: we can decouple our 'record' logic from our 'view' logic.

_Note_: If you're wondering why I'm using MV* instead of MVC, it's because there are a lot of similar patterns: [MVC][mvc], [MVP][mvp], [MVVM][mvvm], &c.

[spotify-web]: http://play.spotify.com
[mvc]: http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller
[mvp]: http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93presenter
[mvvm]: http://en.wikipedia.org/wiki/Model_View_ViewModel
[todo-mvc]: http://www.todomvc.com
[backbone-js]: http://backbonejs.org/

# Wait. Now I have two MVCs?

Yes! We still need Rails to function as our backend, because _JavaScript has no direct access to our database_. Since JavaScript runs on the browser, and our database lives on a server, Rails acts as the intermediary between DB and end user. Huh?

Let's say we have a **JavaScript** `User` model. No need to know anything about it for now; let's pretend its a black box. Since it is a model, we'd like to be able to make new `User`s, then save them to our db. But what should `User#save` do? In Rails, the save method is an ActiveRecord helper that performs a SQL `INSERT INTO`. But it doesn't make any sense for JavaScript to perform a SQL query, because of the reasons above: JS runs on the client, while our database lives on the server.

So here's what a JavaScript model's `User#save` method should do: tell Rails to save to the database for us! The method should execute an AJAX request to our server, sending the appropriate parameters, so Rails can instantiate its own `User` model, and perform its own `save` method, saving it to the database. Rails can then just respond with JSON of this `User`, and we can use this data to update our JS model (so the JS model in the browser has the ID of the persisted `User`, for example). The result is that the end user never sees a page refresh, resulting in snappy, native-program-like behavior.
