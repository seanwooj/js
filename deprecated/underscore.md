# A Tour of Underscore

**TODO**: this is just a list of useful underscore methods right now.

## Important methods

```javascript
var primes = [2, 3, 5, 7]

_.each(primes, function (prime) {
  console.log("print this prime: " + prime.toString());
});

var primesPlusOne = _.map(primes, function (prime) {
  return prime + 1;
});

var firstOddPrime = _.find(primes, function (prime) {
  return (prime % 2) == 1;
});

// `_.reject` is the opposite of `_.filter`
var oddPrimes = _.filter(primes, function (pime) {
  return (prime % 2) == 0;
});

// `_.some` is the opposite of `_.every`
var allNumsAreOdd = _.every(primes, function (prime) {
  return (prime % 2) == 1;
});

var someArrays = [
  [3, 2, 1],
  ["a", "c", "b"]
];

_.invoke(someArrays, "sort");

_.without(primes, 2);
```

[underscore]: http://underscorejs.org/
