// Organizing Client-Side JS libs

// 1. What are the benefits of namespacing your code? take the two functions
//    and re-write them so that the latter does not override the former.

function growl() {
  console.log("grrrrr");
}

function growl() {
  console.log("rarrrr");
}

// 2. Fill in the following library so that we can access the Leopard and
//    Puma constructors.

// 3. For each constructor, write a prototype function called growl. 

var CatLibrary = (function() {
  function Leopard() {
    this.species = "Leopard";
  }

  // add Leopard growl prototype function

  function Puma() {
    this.species = "Puma";
  }

  // add Puma growl prototype function

  return {
    // fill in return value
  };
})();

// This and That

// 1. Compare and contrasth 'this' in JavaScript to 'self' in Ruby.

// 2. What does the 'bind' function do to scope the context of a function?

// 3. What's one way to make sure 'this' is scoped more like any other variable
//    when called inside an anonymous function?

// 4. Using .call() or .apply(), add a 'hello' method to the cat object that,
//    when called, executes the greet function on the cat.

var cat = {
  name: "Tiger"
};

function greet(msg) {
  console.log(msg + this.name);
}

