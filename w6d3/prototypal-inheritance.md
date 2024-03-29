# Prototypal Inheritance

## Classes & Prototypes

JavaScript has an unusual system for implementing
inheritance. JavaScript's version of inheritance is called
**prototypal inheritance**, and it differs from the **classical
inheritance** that we are familiar with from Ruby.

When you call any property on any JavaScript object, the interpreter
will first look for that property in the object itself; if it does not
find it there, it will look in the class's prototype (which is stored
in the object's internal `__proto__` property).

If it does not find the property in the prototype, it will recursively
look at the prototype's `__proto__` property to continue up the
*prototype chain*. How does the chain stop?
`Object.prototype.__proto__` is `Object.prototype`, but
`Object.prototype.__proto__ == null`, so the chain ends.

It is for this reason that we call `Object` the "top level class" in
JavaScript.

Inheritance in JavaScript is all about setting up the prototype
chain. Let's suppose we have `Animal`s and we'd like to have `Dog`s 
that inherit from `Animal` and `Poodle`s that inherit from `Dog`.

Well, we know that we'll instantiate each of these constructor style:

```javascript
function Animal () {};
function Dog () {};
function Poodle () {};

var myAnimal = new Animal();
var myDog = new Dog();
var myPoodle = new Poodle();
```

* `myAnimal`'s `__proto__` references `Animal.prototype`.
* `myDog`'s `__proto__` references `Dog.prototype`.
* `myPoodle`'s `__proto__` references `Poodle.prototype`.

Great, but `Animal`, `Dog`, and `Poodle` don't yet relate to each
other in any way. How can we link them up?

Well, we know that we want `Poodle.prototype` to reference
`Dog.prototype`, and we want `Dog.prototype` to reference
`Animal.prototype`. And when we say reference, we really mean that we
want the `__proto__` property to point to the correct prototype
object. In particular, we want:

* `Poodle.prototype.__proto__ == Dog.prototype`
* `Dog.prototype.__proto__ == Animal.prototype`

`__proto__` is a special property: you can't set it yourself. Only
JavaScript can set `__proto__`, and the only way to get it to do it is
through constructing an object with the `new` keyword.

So this is one way we can hook up the classes into a prototypal
inheritance chain:

```javascript
function Animal() {};

function Dog() {};

// Replace the default `Dog.prototype` completely!
// `Dog.prototype.__proto__ == Animal.prototype`.
Dog.prototype = new Animal();

function Poodle() {};
// Likewise with `Poodle.prototype`.
Poodle.prototype = new Dog();

var myAnimal = new Animal();
var myDog = new Dog();
var myPoodle = new Poodle();
```

*Voila.* Prototypal inheritance. 

Any method that is defined for `Animal.prototype` will be accessible
to all `Dog`s and `Poodle`s instances, because of the recursive search
through the prototype chain. Likewise, any property of `Dog.prototype`
will be accessible to `Poodle`s.

## Problems With Naive Prototypal Inheritance

Okay, you may have noticed something odd with these `prototype`s. In
setting up a prototype (say, set `Dog.prototype = new Animal()`), we
construct an instance of the super class.

Doesn't that seem weird? We create an `Animal` instance (to set up
`Dog.prototype`), before we instantiate any `Dog`s. Why? The `Animal`
object instance stored in `Dog.prototype` is sort of a "fake"
`Animal`; is it really right to create this? It doesn't feel right
that **defining** a new type of `Animal` should involve **constructing
an instance** of `Animal`.

Two side-effects of this weirdness are that:

0. The `Animal` constructor will be called before we create any `Dog`s,
0. Creating a `Dog` instance will never run the `Animal`'s constructor
   function.

Let's see what this means in the real world:

```javascript
function Animal(name) {
  this.name = name;
};

Animal.prototype.sayHello = function () {
  console.log("Hello, my name is " + this.name);
};

function Dog() {};
// Hey wait, doesn't Animal need a name?
Dog.prototype = new Animal();

Dog.prototype.bark = function () {
  console.log("Bark!");
};

// We're not even going to run `Animal`'s constructor, so why bother
// passing the name?
var dog1 = new Dog("James");

// `this.name` is `undefined`
dog1.sayHello();
```

## The Surrogate Trick

Let's summarize our goals:

0. `Dog.prototype.__proto__` **must be** `Animal.prototype` so that we
   can call `Animal` methods on a `Dog` instance.
0. Constructing `Dog.prototype` **must not** involve calling the
   `Animal` constructor function.

The classic trick to accomplish this is to introduce a third class,
traditionally called the **surrogate**. Let's see the trick:

```javascript
function Animal(name) {
  this.name = name;
};

Animal.prototype.sayHello = function () {
  console.log("Hello, my name is " + this.name);
};

function Dog() {};

// The surrogate will be used to construct `Dog.prototype`.
function Surrogate() {};
// A `Surrogate` instance should delegate to `Animal.prototype`.
Surrogate.prototype = Animal.prototype;

// Set `Dog.prototype` to a `Surrogate` instance.
// `Surrogate.__proto__` is `Animal.prototype`, but `new
// Surrogate` does not invoke the `Animal` constructor function.
Dog.prototype = new Surrogate();

Dog.prototype.bark = function () {
  console.log("Bark!");
};
```

This is better, because it avoids improperly creating an `Animal`
instance when setting `Dog.prototype`. However, we still have the
problem that `Animal` won't be called when constructing a `Dog`
instance.

Now you might be wondering why we don't just call `Dog.prototype = Animal.prototype`
We don't do this because that means any function added to Dog would also be added to Animal.

Let's make one final tweak to the previous solution:

```javascript
function Dog(name, coatColor) {
  // call super-constructor function on **the current `Dog` instance**.
  Animal.call(this, name);

  // `Dog`-specific initialization
  this.coatColor = coatColor;
}
```

This pattern is especially useful if the superclass (`Animal`) has a
lot of initialization code. You could have copy-and-pasted the
`Animal` constructor code into `Dog`'s constructor, but calling the
`Animal` constructor itself is obviously much DRYer.

Note that we write `Animal.call` and not `new Animal`. Inside the
`Dog` constructor, we don't want to construct a whole new `Animal`
object. We just want to run the `Animal` initialization logic **on the
current `Dog` instance**. That's why we use `call` to call the
`Animal` constructor, setting `this` to the current `Dog` instance.

## Exercises

### `inherits`

We learned how to implement class inheritance using a
`Surrogate`. There are a number of steps:

* Define a `Surrogate` class
* Set the prototype of the `Surrogate` (`Surrogate.prototype =
  SuperClass.prototype`)
* Set `Subclass.prototype = new Surrogate()`

Write a `Function#inherits` method that will do this for you. This
will help you in Asteroids today:

```javascript
function MovingObject() {};

function Ship () {};
Ship.inherits(MovingObject);

function Asteroid () {};
Asteroid.inherits(MovingObject);
```

How would you test `Function#inherits`? A few specs to consider:

1. You should be able to define methods/attributes on MovingObject that ship and asteroid instances can use.
2. Defining a method on Asteroid's prototype should not mean that a ship can call it.
3. Adding to Ship/Asteroid's prototypes should not change MovingObject's prototype.
4. The Ship and Asteroid prototypes should not be instances of MovingObject.

After you have written this, you may look up [my answer](https://github.com/appacademy/solutions/blob/master/w6/w6d3/inherits.js) so you can use
it for Asteroids.
