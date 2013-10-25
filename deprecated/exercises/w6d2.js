// Server-side JavaScript

// 1. Edit the 'sayHi' method so that it prints "Hello, world!" to the console.

// 2. Edit the name property so that stores your name. Edit your
//    'sayHi' method to greet you by name. What's wrong with the current
//    implementation?

// 3. Given the JS object below, what function is needed in order
//    to use this 'module' in a JS script?

var helloWorld = {
  // name:

  sayHi: function() {
    console.log(name);
  }
};

// Object-oriented JavaScript

// 1. Why is the following function code erring as "undefined is not a function?"
//    Change the function call to print each element of the array.

function forEach(arr, func) {
  for (var i=0; i<arr.length; i++) {
    func(arr[i]);  
  }
}

function iterator(num) {
  console.log(num);
}

forEach([1, 2, 3], iterator());

// 2. JS provides two different notations to access keys in an object literal.
//    Use both to access and change the name of this person.

// 3. Add a method to the person object that increases the age of your person.

var person = {
  name: "Bud",
  
  age: 75,

  increaseAge: // add method
};

// 4. Convert this person object literal into a person constructor
//    that takes two arguments -- name and age -- and sets the attributes.