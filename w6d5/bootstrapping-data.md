# Bootstrapping data

## Fetching data

As we have read in the AJAX chapter, we can use `$.get` to fetch data
from the server. For instance:

```ruby
class EmailsController
  def index
    @emails = Email.all

    respond_to do |format|
      format.html { render :index }
      # if JSON is requested, send back the emails in jsonified format.
      format.json { render :json => @emails }
    end
  end
end
```

And on the client:

```javascript
$.get({
  url: "/emails.json",
  success: function (emails) {
    // do something with the fetched emails here...
  }
});
```

A classic use of AJAX is to 'refresh' a page. For instance, say I am
writing a mail app (think Gmail). Every minute or so, I should check
to see if there are new emails that have arrived for the user; I want
to update the client's inbox view to show the newly arrived emails. To
do this, I make an API request to the fetch the most recently received
emails from the server, then modify the DOM to indicate their presence.

Bam. This is what AJAX is built for.

## AJAX alternatives for initial data

Sometimes you don't need to make an AJAX call. Let's take that email
example. Forget about updating for a second: when you make the initial
request for your inbox, how are you sent your current emails? There
are three main options:

* Send a mostly blank page, and immediately force an AJAX update of
  the emails. This is wasteful, because it requires a second query to
  be sent and replied to before any emails are rendered.
* Generate HTML server-side which displays the current emails. This
  avoids requiring a second request, but it means that the server must
  be able to render the inbox view. If you were planning to render
  this client-side (which is what you have to do on refresh), you now
  have duplicated the rendering code on client and server (in JS and
  Ruby, too).
* Lastly, you can "bootstrap" the data into the DOM. This involves
  injecting a JSON representation of the necessary data into the
  page. Server-side, you write this JSON into the HTML sent to the
  client. The client-side JS code then pulls the JSON out of the page,
  and then runs the templating logic to fill out the presentation.

This third solution avoids unnecessary AJAX calls, and also avoids
duplicating view logic in the client and server.

## Bootstrapping: how-to

Bootstrapping is easy. In a view, we write:

```
<script type="application/json" id="bootstrapped_emails_json">
  { "emails": <%= Email.all.to_json.html_safe %> }
</script>
```

This embeds a JSON representation of all the current `Email` objects
into a `script` tag. Because the type is `application/json` it will
not be interpreted as JavaScript code by the browser.

We can then pull this out client-side via:

```javascript
var data = JSON.parse($("#bootstrapped_emails_json").html());
```

Now we have JS objects for the initial, bootstrapped `Email`
objects. We can use these to do an initial render of the inbox using
these.

Of course, if we need to refresh the `Email`s at a later time, we'll
have to make an AJAX query. But we've reduced the initial page load by
one HTTP request/response cycle.

## Resources

* **PS**: this is not the safest way. It exposes you to cross-site
  scripting (XSS). To be totally safe,
  [check this out][secure-bootstrapping].
    * You may also want to check out the last chapter in Backbone on
      Rails, which describes what I think is a more elegant solution.
    * Regardless, do not worry about this for now.

[secure-bootstrapping]: http://jfire.io/blog/2012/04/30/how-to-securely-bootstrap-json-in-a-rails-view
