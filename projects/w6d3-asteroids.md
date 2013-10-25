# Asteroids

## Phase I: moving pieces (& asteroids)

### `MovingObject`

* Start out with a `MovingObject` class.
* It should initialize with a start `pos`ition and `vel`ocity.
* It should have a `#move` method that uses `vel` to update `pos`.
* `MovingObject` should also take a `radius` and a `color`.
* Write a `#draw(ctx)` method that takes in a `canvas` context and
  draws a circle of the appropriate radius around the `pos`.
* Write a `#isCollidedWith(otherObject)`. Compute the distance between
  the two centers (lookup the formula for distance between two
  points). If the sum of the radii is greater than this, the circles
  collide.
* Write your code in an `Asteroids` namespace in a `moving_object.js`
  file.

### `Asteroid`

* Write your `Asteroid` code in a `asteroid.js` file. Continue to
  namespace in `Asteroids`.
* Make an `Asteroid` class that inherits from `MovingObject` (make
  sure to get the prototype chain right). Use your `inherits`
  function.
* Call the `MovingObject` constructor method in `Asteroid` to run the
  `MovingObject` initialization code.
    * For color, define a `Asteroid::COLOR` property. The capital
      letters indicate a constant.
    * Likewise, define a `Asteroid::RADIUS` property.
* Write a `Asteroid::randomAsteroid(dimX, dimY)` class method. It should:
    * Choose a random starting position within a `dimX` by `dimY`
      grid. You'll want to use `Math.random`.
    * Choose a random velocity. I wrote a helper function `randomVec`.

### `Game`

* Write a `Game` class in `game.js`; continue to namespace.
* The constructor of the game can take a canvas context, `ctx`. Store
  this in an instance variable.
* Setup an instance variable `asteroids`. Use your
  `Asteroid::randomAsteroid` to create some asteroids (I wrote a
  `Game#addAsteroids(numAsteroids)` method).
* I used `Game::DIM_X` and `Game::DIM_Y` constants to fix the size of
  the game board.
* Write a `Game#draw` method. It should use `clearRect` to clear the
  rectangle. Call the `#draw` method of each of the `asteroids`.
* Write a `Game#move` method. It should call `#move` on each of the
  `asteroids`.
* Write a method `Game#step`. This should perform one game step. It
  should move the objects, then re-draw the game.
* Write a `Game#start` method. It should use `setInterval` to schedule
  `Game#step` to be called once every 30 milliseconds or so. I defined a
  `Game::FPS` constant.

### Setup an `index.html`

Write a mostly empty HTML file for your game to run in. In the `head`,
load the required JS files.

In your body, add a single tag of inline JavaScript. It should create
a canvas element of appropriate width/height (I used
`Asteroids.Game.DIM_X`, `Asteroids.Game.DIM_Y`). It should use
`getContext` to extract a canvas context. It should construct a `Game`
object and call `start`.

Your asteroids should fly around :-)

## Phase II: `Ship`

### Basics

* In a `ship.js` file, create a `Ship` class. It should also inherit
  from `MovingObject`.
* I defined `Ship::RADIUS` and `Ship::COLOR` constants.
* In your `Game` constructor, build a `Ship` object at the center of
  the grid.
* Update your `Game#draw` method to also draw the `Ship` in addition to
  `Asteroid`s.
* Update your `Game#move` method to move the ship in addition to
  `Asteroid`s.
* Write a `Game#checkCollisions` method that iterates through the
  asteroids, seeing if any has hit the ship. If so, use `alert` to
  inform the user the game has ended.
    * I also wrote a `Game#stop` method to pause the game.
    * I did this by using the `clearInterval` function.
    * You'll need to save the timer id returned by `setInterval` to be
      later able to clear it. Check out the docs.
* Modify the appropriate method so that collisions are checked for
  each step of the game.

### Moving the ship

* Add a `Ship#power(impulse)`. The impulse should be added to the
  current velocity of the ship.

## Phase III: ship and collision detection

* You should watch for asteroids that slip off the edge. They
  should be removed from `game.asteroids` when this happens.
* Add a `Game#bindKeyHandlers` method. Check out the
  [`keymaster`][keymaster]. Bind keys to call `Ship#power` on the
  game's `ship`.
* Install the handlers on game start.

[keymaster]: https://github.com/madrobby/keymaster

## Phase IV: Firing `Bullet`s

* Write a `Bullet` class. It should inherit again from
  `MovingObject`. You know where to put it.
* Write a `Ship#fireBullet` method. Fire a bullet in the direction of
  the ship's travel, but with a fixed, fast, speed.
    * You can calculate direction from velocity as `velocity /
      speed`. You can calculate speed as `sqrt(v.x ** 2 + v.y ** 2)`.
    * **TODO**: describe how to normalize a vector here.
* If the ship is not moving (`ship.vel == [0, 0]`), do not fire a
  `Bullet`.
* `Ship#fireBullet` should return the constructed `Bullet`, if any.
* Modify your `Game` to track all current `Bullet`s.
* Add a `Game#fireBullet` method. Call the `Ship` method, and add the
  bullet to a `Game`'s `bullets` attributes.
* Modify `draw` and `move` to handle `Bullet`s, too.
* Modify `addKeyBindings` to also let the user hit a key and fire a
  bullet.

Test it out. Your bullets won't do anything yet, but they should fire.

### Hitting `Asteroid`s

* Write a `Bullet#hitAsteroids` method. Iterate through the asteroids,
  calculating if any have been hit. If so, call `Game#removeAsteroid`
  and `Game#removeBullet` methods.
    * Write those `Game` methods, of course :-)
    * You'll need to pass your `Bullet` a `Game` on construction, so
      that it can iterate through the bullets later.
* Write an override for `Bullet#move`. Call the `MovingObject` method,
  but additionally remove any asteroids that are hit by bullets.

## Phase V: Cleaning up objects

* Add a `Game#isOutOfBounds` method. This should return `true` if an
  object slips off screen.
* Each turn, check if an `Asteroid`/`Bullet`/`Ship` has slipped off-screen.
* If so, call the `#remove` method:
    * You'll have to write `#remove` three times; once for each class.
    * For `Bullet`, call `game.removeBullet`.
    * This is good, because you won't waste time rendering bullets
      that have slipped off screen (or check for off-screen
      collisions).
    * I did likewise for the `Asteroid`s; you may wish to move them to
      the appropriate edge opposite where they slipped off.
    * I just reset the `Ship` to the center point, since I felt lazy.


## Phase VI (Bonus): Drawing an image

Oftentimes people want to draw a background image on their game.

```javascript
var img = new Image();
img.onload = function () {
  ctx.drawImage(img, xOffset, yOffset);
};
img.src = 'myImage.png';
```

Note you may have to redraw the background each iteration. You do not
need to constantly reload the img; just make sure to `ctx.drawImage`
each frame.

## Resources

* [Canvas tutorial](https://developer.mozilla.org/en-US/docs/HTML/Canvas/Tutorial?redirectlocale=en-US&redirectslug=Canvas_tutorial)
* [Canvas docs](https://developer.mozilla.org/en-US/docs/HTML/Canvas)
