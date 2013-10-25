# Rendering Views in Express

A simple example:

```
// app.js

// Example file structure
// hello_world/
// |
// --app.js
// --package.json
// --views/
//   |
//   --index.ejs
//   --users/
       |
       --index.ejs
// --node_modules/

app.get('/index', function (req, res) {
  res.render('index.ejs', { name: 'Adam', age: 33 });
});

app.get('/users', function (req, res) {
  res.render('users/index.ejs');
});
```

`res.render` takes the relative path of the template including the file
extension. The default directory for views is `./views` so all relative
paths should be from the views folder (i.e. `users/index.ejs`).

Local variables can be passed in as the second argument to render in an
object. In the example above, both `name` and `age` are available as
local variables in `index.ejs`.

## EJS

Express will automatically require the rendering engine based on the
template file extension. For `index.ejs`, Express will `require('ejs')`
and render the template with that engine. You do need to make sure that
the engine has been installed (`npm install ejs`).

EJS delimiters are the same as those for ERB: `<% %>` for code that will
not show up in the html, `<%= %>` for code that will render into the
html.

## Plain HTML

If you try to `res.render('plain.html')` where `plain.html` is just a
plain HTML file in `views/`, the application throws an error. That's
because Express tries to require a module called `html` which doesn't
exist. We need to tell the application to use EJS on plain HTML files.

```
app.engine('html', require('ejs').renderFile);
```

Now we can render HTML files without a problem:

```
app.get('/plain', function (req, res) {
  res.render('plain.html');
});
```

Next we'll see how to serve up static assets like CSS and JS files.

