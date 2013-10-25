# Serving Static Files in Express

To serve static files, use the `express.static` middleware like so:

```
app.use('/static', express.static('./static'));
```

This assumes that all requests for static files will start with
`/static` (the first argument to use) and that all the static files live
in a directory called `static`. 

If you wanted to split things up, you could:

```
app.use('/scripts', express.static('./assets/javascripts'));
app.use('/stylesheets', express.static('./assets/stylesheets'));
```

Here, a request `GET /scripts/hello_world.js` would serve up
`./assets/javascripts/hello_world.js` and a request `GET
/stylesheets/app.css` would serve up `./assets/stylesheets/app.css`.

