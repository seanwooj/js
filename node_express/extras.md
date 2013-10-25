## Middleware

From when the request hits the server, express will pass the request and
response objects through a series of functions called middleware before
it hits the route & handler.

Express doesn't ship with a logger by default, but we could write a
simple one by defining our own middleware.

```
app.use(function (req, res, next) {
  console.log('%s %s', req.method, req.url); 
  next();
});
```

To use a middleware function, you call `app.use`.  It takes the request,
response, and a function that will continue down the chain. If `next`
were not called in the example above, the chain of execution would have
halted and the server would just hang. 

Express actually ships with a logger that you can include as middleware:

```
app.use(express.logger());
```

## Express configuration & environments
* Set and get global config options
  * app.get('name')
  * app.set('name', value)
  * List of settings: http://expressjs.com/api.html#app-settings
* Environments (i.e. production, development, etc.)
  * Get current environment: `app.get('env')`

To run some configuration code based on the envrionment you're in, you
can use a call to `app.configure` for each environment you'd like to
setup a particular way:

```
app.configure('environment-name', function () {
  // Callback will be run for that environment
  app.set(...
});
```


