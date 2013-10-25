# Towers of Hanoi

Let's rewrite the towers of Hanoi game we previously wrote in Ruby.
[Here's][ruby-hanoi] a link to the old instructions.

Namespace the entire game using the module pattern discussed in
the readings. The beginning of your code should look like...

```javascript
(function (root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});
  .
  .
  .
})(this);
```

Now think -- how is this going to be different than writing Hanoi in Ruby?

* How will you object orient your code?
  * You should have a `Game` constructor function that is available outside the top most `function` scope.
  * Add methods to the `Game`'s prototype.
* Looping might be difficult, since you have to wait for user input.
  * Remember, Javascript code will not wait for your callbacks to be executed.
  * What programming construct will allow you to get around this?

[ruby-hanoi]: https://github.com/appacademy/ruby-curriculum/blob/master/w1d1/data-structures/array.md#towers-of-hanoi

# Tic Tac Toe

[Here's][ruby-ttt] a link to the old instructions for Tic Tac Toe. The same
concerns as above apply here. Again, namespace your code using the module
pattern, and think about how the run "loop" will function with respect to
Javascript's asynchronous nature.

[ruby-ttt]: https://github.com/appacademy/ruby-curriculum/blob/master/w1d2/classes.md#tic-tac-toe