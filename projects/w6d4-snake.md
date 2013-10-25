# Snake

We're going to write a Snake game!

## Phase I: `Snake` and `Board`

* Write your code in a `snake.js` file (with appropriate namespace).
* Write a `Snake` class
    * Store the `dir` of the snake. I made this one char
      (`["N", "E", "S", "W"]`).
    * Store the `segments` of the snake. I stored grid coordinates.
    * I wrote a simple `Coord` class. It had a handy `plus` method.
    * Write a `Snake#move` function that will move the snake in the
      current direction.
    * I wrote a simple `turn` method that took a new direction and
      updated `dir`.
* Write a `Board` class.
    * The board should construct and hold a `Snake`.
    * Later, your `Board` can hold on to the apples that are on the
      board.
    * Write a simple `Board#render` method that renders the board to
      ASCII art. I used `"."` for blank spaces and `"S"` for spaces
      the snake occupied.

## Phase II: Write a simple `View` class

* Write your UI code in a `snake_ui.js` file. Use the same namespace.
    * **Do not mix UI into your model layer**. Keep `snake.js`
      agnostic of the code that displays the game, or that listens for
      browser events.
* Write a `View` class that takes in an HTML element which will hold
  the display. Save this in a `$el` instance variable.
* Write a `#start` method that constructs a `Board`.
    * `#start` should bind key events. I used jQuery's `on` method
      with event `"keydown"`.
    * Lookup and read the relevant jQuery docs as needed.
    * I wrote a helper method `handleKeyEvent(event)`. It looked up
      `event.keyCode` and passed the appropriate direction to
      `Snake#turn`.
* My `#start` method also used set interval to run a `#step` method
  every half second. Each turn it calls `Snake#move` and redraws the
  whole board.
* To draw the board, I just set the HTML contents of the root element
  to the result of `Board#render`. This ASCII art version works fine
  if you use a `pre` tag.

## Phase III: On your own!

* Change how you render the board. Instead of ASCII art, use divs with
  CSS classes.
    * As before, I would redraw the board each turn.
* Add apples to the game. When a snake eats an apple, it grows (for a
  few moves). Randomly generate apples every several turns.
* Detect when a snake hits itself. You lose!

## Phase IV: Bonus!

Many of you will finish the basic functionality with time to
spare. Here are some fun things you can add:

* Keep score (10 points for each apple eaten)
* Pause and restart game
* Leaderboard (keep high scores)
    * Note that you won't be able to store scores across loads of the
      game.
* Tron Snake: 2 player snake (use the 'wasd' keys for one and arrow
  keys for the other) with both snakes running at the same time.

Feel free to come up with extensions of your own. Have fun with it
(and show off to your classmates)!
