# Intro to Callbacks: File I/O

## What is a callback?

Closures are a very big part of JavaScript. One reason they are so important
is because they are often used as **callbacks**.

A callback is a function that is passed to another function and
intended to be called at a later time. The most common use of
callbacks is when a result will not be immediately available,
typically because it relies on user input.

Perhaps the simplest example is to ask JavaScript to wait a specified
period of time and then call a function. This uses the `setTimeout`
method:

```javascript
// wait 2000 milliseconds and then print great movie link:
window.setTimeout(function () {
  console.log("http://en.wikipedia.org/wiki/Out_of_Time_(2003_film)");
}, 2000);
```

Here the callback prints the movie title. The `setTimeout` method
holds on to the function, waiting to call it after the appropriate
period. The callback is essential here, because `setTimeout` needs to
know what do at the end of the timeout.

The above function passes a **callback** to `setTimeout`. In this
case, the callback is not a **closure**, since it uses no outside
variables. That's because we've hard-coded the URL. Let's see an
example that illustrates why closures are so commonly used as
callbacks:

```javascript
function scheduleGreatMovieReminder(movie) {
  // remind in one min
  window.setTimeout(function () {
      console.log("Remember to watch: " + movie);
    }, 60 * 1000
  );
}

scheduleGreatMovieReminder("Citizen Kane");
scheduleGreatMovieReminder("Touch of Evil");
scheduleGreatMovieReminder("The Third Man");

// Easter egg!
// http://en.wikipedia.org/wiki/Frozen_Peas
```

## JavaScript is Asynchronous

In Ruby programming, most of the methods we wrote are **not** like
`setTimeout`. `setTimeout` sets a timer (we'll talk about how later;
it turns out `setTimeout` is a special function) and then immediately
returns. `setTimeout` returns before the timeout is up, long before
the callback is actually invoked.

`setTimeout` is called **asynchronous**. An asynchronous function does
not wait for work to be completed. It schedules work to be done in the
bacground. Asynchronous functions tend to be used when work may take
an indeterminate amount of time:

* timers
    * waits a specified amount of time
* background web requests (AJAX)
    * Makes a possibly slow connection to a server that may live far
      away
    * Will pass the fetched data to the callback when the response
      eventually comes in.
* events
    * Example: there's a button on the page. We want to run a function
      when the user clicks it.
    * This is called a **click event**.
    * We **install** a **click handler**. A click handler is a
      callback that is invoked when a click occurs.
    * We don't know how long it will be before the click happens, but
      when (and if) a click actually occurs, the callback will have
      been stored and will be run.

The opposite of asynchronous is **synchronous**. For example, a
synchronous analogue to `setTimer` would be Ruby's `sleep` method.
`sleep` pauses execution for a specified period of time. Likewise, if
AJAX requests were not asynchronous, calls to `$.ajax` (the `$` means
jQuery; we'll learn it soon!) would not return right away, but would
instead wait for the HTTP response. The response could then be
returned to the caller, so no callback would be necessary.

## Node I/O is Async

Ruby has the methods `puts` and `gets`. JavaScript has `console.log`
as an analogue to `puts`, but it doesn't have an exact analogue for
`gets`.

In a web browser, you may use the `prompt` method to pop up a message
box to ask for input from the user. When running server-side code in
the node.js environment, `prompt` is not available (because node is
not a graphical environment).

Instead, you must use the `readline` library when writing server-side
node.js programs. Here's the [documentation][readline-doc].

[readline-doc]: http://nodejs.org/api/readline.html

Here's a simple example:

```javascript
var readline = require('readline');

var reader = readline.createInterface({
  // it's okay if this part is magic; it just says that we want to 
  // 1. output the prompt to the standard output (console)
  // 2. read input from the standard input (again, console)

  input: process.stdin,
  output: process.stdout
});

reader.question("What is your name?", function (answer) {
  console.log("Hello " + answer + "!");
});

console.log("Last program line");
```

The `question` method takes a prompt (`"What is your name?"`) and a
callback. It will print the prompt, and then ask node.js to read a
line from stdin. `question` is asynchronous; it will not wait for the
input to be read, it returns immediately. When node.js has received
the input from the user, it will call the callback we passed to
`reader.question`.

Let's see this in action:

```
~/jquery-demo$ node test.js
What is your name?
Last program line
Ned
Hello Ned!
```

Notice that because `reader.question` returns immediately and does not
wait, it prints `"Last program line"` before I get a chance to write
anything. Notice also that I don't try to save or use the return value
of `reader.question`: that's because this method does not return
anything. `reader.question` cannot return the input, because the
function returns before I have actually typed in any input. **Asynchronous functions do not return meaningful values: we give
them a callback so that the result of the async operation can be
communicated back to us**.

One final note: note that our program didn't end when it hits the end
of the code. It patiently waited for our input. That's because node
understands that there is an outstanding request for user input. Node
knows that the program may not be done yet: anything could happen in
response to that input. So for that reason, node doesn't terminate the
program just because we hit the end of the source file.  If we want to 
stop accepting input, we have to explicitly call `reader.close()`.

## Example #1

Let's see a more developed example:

```javascript
var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addTwoNumbers(callback) {
  // notice how nowhere do I return anything here! You never return in
  // async code. Since the caller will not wait for the result, you
  // can't return anything to them.
  
  reader.question("Enter #1", function (numString1) {
    reader.question("Enter #2", function (numString2) {
      var num1 = parseInt(numString1);
      var num2 = parseInt(numString2);

      callback(num1 + num2);
    });
  });
}

addTwoNumbers(function (result) {
  console.log("The result is: " + result);
});
```

Notice the use of closures and callbacks:

0. the `numString1` callback closure captures the callback.
0. the `numString2` callback closure captures `numString1`, and also the
   `callback`.
0. the `result` callback isn't a closure, as it captures nothing
   (result is passed as an argument)

Note: `callback` is not a Javascript keyword. It is simply the name of the parameter 
we are passing to `addTwoNumbers`.

## Example #2

Let's write a silly method, called `crazyTimes`:

```javascript
function crazyTimes(numTimes, fun) {
  var i = 0;
  
  function loopStep() {
    if (i == numTimes) {
      // we're done, stop looping
      return;
    }

    fun();

    // recursively call loopStep
    i += 1;
    loopStep();
  }
  
  loopStep();
}
```

Notice how this loops in a weird way. Of course, this is a crazy way
to implement `times`, and you wouldn't do this normally. But we're
going to build on this in a moment...

## Example #3

When we need to do a loop in code that is asynchronous, we can modify
the trick from above:

```javascript
function buildArray(numberOfElements, callback) {
  var arr = [];

  function performStep() {
    if (arr.length === numberOfElements) {
      callback(arr);
      
      // we're done, stop looping
      return;
    }

    reader.question("Next element to add: ", function (element) {
      arr.push(element);

      // keep on looping!
      performStep();
    });
  }

  performStep();
}
```

## Exercises

### Timing is Everything

Use [`setInterval`][setInterval-doc] to build a small clock in your
terminal. It should display the current time every 5 seconds. However, 
you can only use [`Date.new`][date-docs] once at the
very beginning of your program to fetch the current time. Store the
hour, minutes, and seconds. Your clock should increment those
variables over time. It should display the time in `HH:MM:SS` after
each five second tick. Use a 24hr clock.

Make a `Clock` class. When you call `#run`, store the starting time in
an attribute. Schedule a `#tick` callback in five seconds. Update the
time and `console.log`.

You'll especially want the `#getSeconds`, `#getMinutes`, `#getHours`
methods of `Date`.

You don't have to worry too much about padding zeroes in the format.

[setInterval-doc]: http://nodejs.org/api/globals.html#globals_setinterval_cb_ms
[date-docs]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

### `addNumbers`

Let's write a function that will read four numbers, one after another,
and sum up the total. After each number, let's print out the partial
sums along the way, and pass the total sum to a callback when done.

First off, use `readline.createInterface` to create a global variable,
`READER`. Use `process.stdin`/`process.stdout` like I do in my
examples.

Next, write a helper method, `addNumbers(sum, numsLeft,
completionCallback)`:

* If `numsLeft > 0`, then:
    * Prompt the user for a number (use `READER`)
    * Pass a callback that:
    * Uses `parseInt` to parse the input.
    * Increment the `sum` and `console.log` it.
    * Recursively calls `addNumbers` again, passing in:
        * the increased `sum`,
        * the decreased `numsLeft`,
        * and the same `completionCallback`.
* If `numsLeft == 0`, call `completionCallback(sum)` so that the total
  sum can be used.

To test, try out:

```javascript
addNumbers(0, 3, function (sum) {
  console.log("Total Sum: " + sum);
});
```

This should prompt for three numbers, printing out the partial sums
and then the final, total sum.

### `crazyBubbleSort`

In this exercise, we write a method called `crazyBubbleSort(arr,
sortCompletionCallback)`. Instead of using the traditional `<`, we'll prompt the user
to perform each comparison for us.

First, write a method `askLessThan(el1, el2, callback)` which prompts
the user to compare two elements. The user can type in `"yes"` or
`"no"`: if the user indicates that `el1 < el2`, `askLessThan` should
call `callback` with `true`. Else, it should call `callback` with
false.

You'll want to set up a global `READER` variable (use
`readline.createInterface`). `askLessThan` should use the `question`
method.

Next, write a method `performSortPass(arr, i, madeAnySwaps,
callback)`. This recursive function should:

* If `i < arr.length - 1`, it should call `askLessThan`, asking it to
  compare `arr[i]` and `arr[i + 1]`.
* For a `callback` to `askLessThan`, pass in an anonymous helper
  function. This should:
    * Take in a single argument: `lessThan`, which `askLessThan`
      will call with either `true` or `false`.
    * Perform a swap of elements in the array if necessary.
    * Call `performSortPass` again, this time for `i + 1`. It should
      pass `madeAnySwaps`.
* Call `callback` if `i == (arr.length - 1)`. It should call
  `callback(madeAnySwaps)`.

This method should now perform a single pass of `bubbleSort`.

Lastly, write a method `crazyBubbleSort(arr,
sortCompletionCallback)`. Define a function `sortPassCallback` inside
of `crazyBubbleSort`. It should:

* If `madeAnySwaps == true`, call `performSortPass`. It should pass in
  `arr`, an index of `0`, and `false` to indicate that no swaps have
  been made. For a callback to `performSortPass`, pass `sortPassCallback`
  itself.
* If `madeAnySwaps == false`, sorting is done! call
  `sortCompletionCallback`, passing in `arr`, which is now sorted!

To kick things off, `crazyBubbleSort` should call
`sortPassCallback(true)`. In response, `sortPassCallback` will kick off the
first sort phase.

To test this finally, try:

    crazyBubbleSort([3, 2, 1], function (arr) { console.log(arr) });
