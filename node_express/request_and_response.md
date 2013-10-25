# Requests and Responses in Express.js

## All Params

Three sources of incoming data:
* Route parameters (`req.params`)
* Query string (`req.query`)
* POST data (`req.body`)

You can also use `req.param('name-of-param')` and it will look up that
parameter name in all three sources (order of lookup: route parameters,
POST data, query string), but explicitly using `req.params`,
`req.query`, or `req.body` is preferred.

### Query String Parameters

Express will parse query string parameters for you and make them
available in `req.query`:

```
// Example request to '/search?q=brain+food&location=sf'

app.get('/search', function (req, res) {
  var q = req.query.q;
  var location = req.query.location;
});
```

Express also follows the same conventions for nested query parameters
(this is also the case for POST data) as Rails does:

```
// Example request to '/hello?user[name]=john&user[email]=j@j.com'

app.get('/hello', function (req, res) {
  var user_name = req.query.user.name;
  var user_email = req.query.user.email;
  var user_params = req.query.user;
});
```

### Post Data

Express will parse the data in the body of a `POST` request; the data is
contained in `req.body` and follows the same conventions as `req.query`,
including those for nested params.

```
// Example POST request to '/users' with 
// { 'user[name]': 'j', 'user[email]': 'j@j.com' }

app.post('/users', function (req, res) {
  var user_name = req.body.user.name;
  var user_email = req.body.user.email;
});
```

## Cookies

To have the cookies available and parsed in the request object, use the
`cookieParser()` middleware:

```
app.use(express.cookieParser());
```

Parsed cookies will be available in object format in `req.cookies`. 

Setting the response cookies: `res.cookie('cookie_name', { key1:
value1, key2: value2 })`

Here's a sample counter action that keeps a count in the cookie and
displays that count in the html:

```
app.get('/counter', function (req, res) {
  var cookie = req.cookies.counter_app || {};
  var initialCount = cookie.count || 0;
  var newCount = initialCount + 1;
  res.cookie('counter_app', { count: newCount });
  res.send('' + initialCount);
});
```

## Responding

* Set status code
  * `res.status(404)`
  * `res.status(200)` *(default)*
* Writing to response body
  * `res.send('html-string')`
  * Status code & body: `res.send(statusCode, `html-string`)`
  * Just pass an object for a JSON response: `res.send(javascriptObject)`
    * e.g. `res.send(404, { error: "couldn't find user" })`
* Redirecting
  * `res.redirect('url-to-redirect-to')`
  * Can pass relative paths or if going off-site, put fully qualified
    url (i.e. "http://www.google.com")
* Setting cookies
  * `res.cookies('cookie_name', { key1: value1, key2: value2 })`
* Setting arbitrary headers
  * `res.set('header-name', value)`


