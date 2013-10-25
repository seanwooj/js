As you go through Eloquent Javascript, type in every code block given
into the console provided in the (online) book; don't copy-paste!

Questions you should be able to answer:

__ch02__
* What is a unary operator? What is a binary operator?
* What is an expression? (A piece of code that produces a value is
  called an expression.)
* What is a statement?
* What is the environment? (The collection of variables and their
  values that exist at a given time; can hold functions such as
  `alert`)
* How do you create a popup with text?
* How do you create a confirmation popup?
* How do you convert a value to a number?
* How do the following evaluate?

    show(false == 0);
    show("" == 0);
    show("5" == 5);
    show(null === undefined);
    show(false === 0);
    show("" === 0);
    show("5" === 5);    

* What is the difference between `==` and `===`?
* What values count as `false`?
* How do you check if something is `NaN` (not a number)?
* How can you use the boolean operators (`&&` and `||`) to produce
  fallback values?

Braces ({ and }) are used to group statements into blocks. To the world outside the block, a block counts as a single statement.

__ch03__
* What does a function return if no return statement is encountered?
* When a function is defined inside another function, is its local
  environment based on the local environment of the function that
  surrounds it or the top-level environment?
* What creates a new scope in javascript? Do blocks produce a new
  scope?
* How do you construct a closure?
* How can a closure be used to synthesize a function?
* What happens when you pass the wrong number of arguments to a
  function?
  
__ch04__
* What is a property? What are the two ways to access them?
* What values have no properties in JS?
* Are properties on string values mutable? How about properties on
  objects?
* What is the structure of a property? What is the type of property
  labels?
* When accessing a property value through bracket notation (i.e.,
  `[]`), what is valid to put between the brackets? (ans: any
  expression)
* How do you delete a property?
* How do you check if an object has a certain property?
* When comparing objects, under what condition will the `==` operator
  return `true`?
* How do you append a value to an array?
* What is a method? (ans: a property that contains a function)
* Be familiar with `join`, `split`, `slice`
* How do you iterate over all the elements of a collection with a
  `for` loop?
* How do you make a new object through a constructor?
* Note that some of the functions (such as `extractDate`) are heavily
  coupled to the representation of the data, and are not good examples
  of what to do.
* How do you get access to the arguments passed to a function? How do
  you find out how many arguments were passed?

__ch05__
* What are the problems with error handling by returning `false` or
  `undefined` when something fails?
* Know how exception handling works in Javascript (i.e., specifically,
  know how to use `throw`, `try`, `finally` and `catch`)

__ch06__
* What is *functional programming* and why would you use it?
* Why use *abstracted* (or *higher-order*) constructs?
* What is a *higher-order function* and why would you use one?
* What is the `apply` method used for?
* Pay close attention to how Haverbeke decomposes the HTML-generator
  problem.
* If you've already covered regex, use them to solve the exercises in
  this chapter.
* Why is it better to use an array to accumulate strings and join into
  a result string at the end than build up the string incrementally?
* What is *partial application* and why would you use it?
* What is *function composition* and why would you use it?
