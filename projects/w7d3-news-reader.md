# News Reader

## Phase I:

### Fetching RSS feeds

First, install `simple-rss`.

```
gem install simple-rss
```

You'll also want `open-uri`, which provides a simple interface for
reading files. This is part of Ruby itself, but we need to require it.

SimpleRSS has a simple interface:

```ruby
[17] pry(main)> require 'open-uri'
=> true
[18] pry(main)> require 'simple-rss'
=> true
[19] pry(main)> feed = SimpleRSS.parse(open("http://feeds.feedburner.com/newsyc20"));
[20] pry(main)> feed.title
=> "Hacker News 20"
[21] pry(main)> feed.entries.count
=> 25
[22] pry(main)> feed.entries.first
=> {:title=>
  "Cornell NYC Tech Campus gets $133 Million from co-founder of Qualcomm (cornellsun.com)",
 :link=>
  "http://cornellsun.com/section/news/content/2013/04/22/two-cornell-alumni-donate-133-million-tech-campus-bloomberg-announce",
 :description=>
  "&lt;a href=\"http://news.ycombinator.com/item?id=5593384\"&gt;Comments&lt;/a&gt;&lt;img src=\"http://feeds.feedburner.com/~r/newsyc20/~4/acfo12bplj4\" height=\"1\" width=\"1\"/&gt;",
 :comments=>"http://news.ycombinator.com/item?id=5593384",
 :pubDate=>2013-04-22 15:30:06 -0700,
 :guid=>
  "http://cornellsun.com/section/news/content/2013/04/22/two-cornell-alumni-donate-133-million-tech-campus-bloomberg-announce"}
```

Since you're not here to learn about RSS, there is a
[skeleton][rss-skeleton] provided that has the basic RSS methods you
need already written. Read through the `Feed` and `Entry` model to see
what's been built. Look at the controllers that has been built for you as
well.

[rss-skeleton]: https://github.com/appacademy-demos/news-reader-demo

### Rails API

The API has already been written for you. Take a look at the code. Each Feed will have
many Entries.

The API looks something like this:

* /feeds/
    * Returns the Feeds the user subscribes to.
* /feeds/123/entries

The `Feed` model has an instance method `reload` to pull down the latest `Entry`
items for a `Feed`: it avoids storing refetched duplicates by using the
RSS guid (global unique id). 

What you should do in your controllers is check to see when the latest
entries for that feed were pulled; if it has been more than 2 minutes
since loading, call `reload` and return the new entries.

## JS Client with Backbone

* Create your router with index and show routes for feeds
* Write a simple FeedsIndexView that displays all the feeds, linked to
  their feed view
* Write a simple FeedView.
    * Add a "refresh" button that will fetch the latest stories from
      the server (i.e. your Rails API)
* Write a simple EntryView and link each entry in the FeedView to its
  own entry view. Update your router as well.

### Modeling relations in Backbone

When writing `FeedView`, we need to fetch and display the entries for
a feed. In Rails, if given a `Feed`, we could just call
`feed.get('entries')`, but we haven't informed Backbone how to fetch
associated objects. In fact Backbone.Model doesn't have any
association functionality at all.

Build some basic association functionality like so:
  * Entries should be sent along with feeds from your API (nested JSON)
  * Override your Backbone Feed model's [`parse`][backbone-parse] method
    to convert the nested entry JSON into Backbone Entry model objects
    and put them into a Backbone collection. `parse` should return an
    object, so the only thing you should change is the data under the
    `entries` key, which should be a Backbone collection.
  * If you initially bootstrap your feeds and find that your parse method isn't running,
    pass {parse: true} in the options hash to ensure that parse is called.
    e.g. `new SomeCollection(jsonData, {parse: true})`.

[backbone-parse]: http://backbonejs.org/#Model-parse

`parse` is called when receiving a response from the server and will be
passed the response data. Also know that the model method `toJSON` is
called when sending data back to the server. Know these methods well
(i.e. read the docs and ask questions). 

Now, you should be able to call `feed.get('entries')` and receive a Backbone
collection of Entry model objects.

## Additional Functionality

Once you complete the above basic functionality, add the following:

* Users & login
* Users have their own set of feeds
* Users can favorite feeds
* Users can favorite entries

## IGNORE BELOW THIS LINE

### OLD BACKBONE RELATIONAL

The most common solution is to use the
[Backbone-relational][backbone-relational] library.
Backbone.RelationalModel extends `Backbone.Model`; it allows you to
specify associations between models:

```javascript
// app/assets/javascripts/models/task.js

// Notice that you extend off of Backbone.RelationalModel instead of
// Backbone.Model
TD.Models.Task = Backbone.RelationalModel.extend({
  urlRoot: "/tasks"
});

// app/assets/javascripts/models/user.js

// We pass in a userId here so that this collection can generate the 
// correct nested url when communicating with the server
TD.Collections.UserTasks = Backbone.Collection.extend({
  initialize: function (models, options) {
    this.userId = options.userId;
  },
  
  url: function () {
    return "/users/" + this.userId + "/tasks";
  }
});

TD.Models.User = Backbone.RelationalModel.extend({
  urlRoot: "/users",
  
  // Here is where the actual associations are setup
  relations: [{
    // type, key, and relatedModel are the essential properties here
    // type is either Backbone.HasMany or Backbone.HasOne
    // key specifies the attribute on User that will hold the tasks
    // relatedModel specifies what kind of object should be in the
    // user's 'tasks' property
    type: Backbone.HasMany,
    key: "tasks",
    relatedModel: "TD.Models.Task",

    // Specifying a collection type here will make it so that all the 
    // user's tasks (i.e. task models) will be put in a collection.
    // Only used with a HasMany relationship
    collectionType: "TD.Collections.UserTasks",
    
    // Used to provide options to the collection upon construction. We
    // want the collection to know the user's id so that it can build
    // the proper URL when communicating with the server.
    collectionOptions: function (user) {
      return { userId: user.id };
    },
    
    // When calling toJSON on the user model, you may or may not want 
    // the tasks to be serialized as well. Here we specify that they
    // should not be serialized.
    includeInJSON: false,

    // reverseRelation is used for bidirectional relationships. 
    // As above, key, type, and relatedModel are the essential properties,
    // but relatedModel is automatically set (in this case, User), and
    // type defaults to the opposite of the current relation (HasOne in
    // this case). So only key is required to be specified.
    reverseRelation: {
      key: "user_id",

      // Since the user_id property of a task will now actually be a
      // User model object, we tell Backbone.Relational to only include
      // the user's id when serializing the task to JSON (so that
      // user_id is in fact just an id).
      includeInJSON: "id"
    }
  }]
});
```

In this example, we connect `Task`s with
`User`s. `Backbone.RelationalModel` expects to receive an array of
relations. Here we specify a `HasMany` relation of tasks: we specify
the related model and a collection type to use for fetching the
objects. Because the `UserTasks` collection will require the User's id
attribute to fetch tasks, we specify the `collectionOptions` option.

Finally, we set up a reverse relationship to map back from the `User`
to the `Task`.

This, of course, is just an example, but it should serve as a good model
for how entries and feeds will be associated to one another. 

You'll need to download the [`backbone-relational`
JS][backbone-relational] into your `vendor/assets/javascripts/` folder
and require it in `application.js`.

[backbone-relational]: http://backbonerelational.org/

*NB: If you have an error where _.findWhere doesn't exist, then stop
using the backbone gem.  Download the backbone.js and underscore.js
files manually and stick them in your `vendor/assets/javascripts/` dir
and require them in `application.js`. (The gems are out of date)*


