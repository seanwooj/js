# Routing in Express.js

To define routes, we call one of the four HTTP verbs on the `app` object
and pass the method call two arguments: a path and a route handler
function (a callback). Think of the callback function as your controller
action.

Like in Rails, requests will match on the HTTP verb and on the path, and
it will match routes in the order they were defined.

Here's how we'd define a GET request to the root path:

```
app.get('/', function (req, res) {
  res.send('Hello World!');
});
```

Don't worry about the body of the route handler just yet; we'll get
there.

## Route Parameters

Named route parameters are much like they are in Rails, and those
parameters are available in `req.params` by the same name as in the
route:

```
app.get('/users/:user_id/posts/:id', function (req, res) {
  var user_id = req.params.user_id;
  var id = req.params.id;
  res.send("User ID: " + user_id + "\n" + "Post ID: " + id);
});
```

## Route Handlers aka Controller Actions

Each route has a callback that is called when that route is matched. The
callback will be passed a request object and a response object and is
responsible for altering the response object and sending that response
back to the requestor.

We'll cover the basics of both the request and response objects.

* Request object
  * Route parameters *(covered above)*
  * Query string parameters
  * POST data
  * Cookies
* Response object
  * Set the status code
  * Write to the response body (JSON & HTML)
  * Set cookies
  * Redirect
  * Respond to multiple formats


