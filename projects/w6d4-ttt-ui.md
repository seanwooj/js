# Your First User Interfaces

Please use the Tic-Tac-Toe and Towers of Hanoi solutions. Build your
own user interface on top of it.

Note: The provided solutions are written for the node console, and
use a `run game` loop.  You will need to make adjustments so that
the game interactions happen through the browser page rather than 
the console, and you should not need a `run game` type loop.


## Tic-Tac-Toe

You will have to comment out the `require("./underscore")` line in my
TTT solution. `require` is a node.js function that loads another
source file. In the browser, we load libraries with the `script` tag.

Make a grid. You can use `div` elements to represent rows in the
grid. Nested inside each row, add `div` elements for each cell. The
cell `div` elements should be set to `float: left` so that they can
appear all on the same line.

Set a border on the cells. When a user clicks on one, update the TTT
state. Also, switch the cell's color to red/blue (for x/o).

Display a congratulatory message when a player wins!

## Towers of Hanoi

Use divs to store three piles. Inside, use divs to store the discs.

Write a `TowersUI` class. This should have a `#render` method that
builds the DOM and displays the current game state.

Your `TowersUI` class should install a click handler on the pile
divs. On the first click to a pile, get the pile number and store this
in an instance variable. On the second click (which you can identify
by the ivar being set), perform the move. Reset the ivar after.

After each move, call `render` to redraw the board.

To improve UX, somehow highlight a pile so that it is clear which pile
has been clicked first.

Make sure to be toggling CSS classes throughout. All CSS should go in
a `.css` file; don't do any CSS manipulation in JavaScript beside
toggling classes.
