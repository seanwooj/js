# `data-*` Attributes

It is common to want to store data inside the DOM. To do this, you can
add your own `data-*` attribute to any element. Let me give you an
example:

```html
<ul id="dogs">
</ul>

<script>
  DOGS = [{
    id: 101,
    name: "Sable",
    genus: "Husky Huskius"
  }, {
    id: 234
    name: "Blixa",
    genus: "Corgi Corgiorum"
  }];

  var $dogsUl = $("ul#dogs");
  DOGS.forEach(function (dog) {
    var $dogLi = $("<li class='dog'></li>");
    dogLi.text(dog.name + " -- " + dog.genus);
    // store the dog's id in the DOM
    dogLi.attr("data-id", dog.id);
    $dogsUl.append(dogLi);
  });

  // Yo dawg, I heard you like event delegation.
  $dogsUl.on("click", "li.dog", function (event) {
    var $dogLi = $(event.currentTarget);

    // pull dog id out of the DOM
    var dogId = parseInt($dogLi.attr("data-id"));
    // use the dog id to lookup a dog
    var dog = _(DOGS).findWhere({ id: dogId });

    alert(dog.name + " loves you!");
  });
</script>
```

Notice how one click-handler is responsible for all the dog `li`
tags. You should never have to install per-item event handlers. The
key here is that we can store the id in the dom, which the handler
uses to know what dog to work on.

The key is the use of `data-*`, plus using **event delegation** in the
click handler. Note that the click handler is installed on
`$dogsUl`. **However**, the extra `"li.dog"` argument means that the
handler will only be invoked for a click on an dog list item inside
the ul. Moreover, because the handler applies to any li in the dogs
ul, clicks on lis **added after the handler is installed** will still
fire the event.

This is in contrast to

    $("li.dog").on("click", function () { ... })

which will:

0. Setup multiple click listeners (one per `li.dog`),
0. Will not apply to any new `li.dog` elements that are created later.
