function sum(nums) {
  let args = Array.from(arguments)
  return args.reduce((acc,el) => {return acc + el})
}

function sum(...nums) {
  let args = nums.reduce((acc,el) => {return acc + el})
  return args
}


Function.prototype.myBind1 = function (ctx) {
  const fn = this;
  const bindArgs = Array.from(arguments).slice(1);
  return function _boundFn() {
    const callArgs = Array.from(arguments);
    return fn.apply(ctx, bindArgs.concat(callArgs));
  };
};

Function.prototype.myBind2 = function (ctx, ...bindArgs) {
  return (...callArgs) => this.apply(ctx, bindArgs.concat(callArgs));
};

function curriedSum(numArgs) {
  const numbers = [];

  function _curriedSum(num) {
    numbers.push(num);

    if (numbers.length === numArgs) {
      let total = 0;

      numbers.forEach((n) => { total += n; });

      return total;
    } else {
      return _curriedSum;
    }
  }

  return _curriedSum;
}

// using spread
Function.prototype.curry = function (numArgs) {
  const args = [];
  const fn = this;

  function _curriedFn(arg) {
    args.push(arg);

    if (args.length === numArgs) {
      return fn(...args);
    } else {
      return _curriedFn;
    }
  }

  return _curriedFn;
};

Function.prototype.curry1 = function (numArgs) {
  const args = [];
  const fn = this;
  function _curriedFn(arg) {
    args.push(arg);
    if (args.length === numArgs) {
      return fn.apply(null, args);
    } else {
      return _curriedFn;
    }
  }
  return _curriedFn;
};

/**
 * With ES6 arrow functions
 * Notice we dont need to keep track of the `this` context (const fn = this).
 * An arrow function does not have its own `this`,
 * the `this` value of the enclosing execution context is used.
 */
Function.prototype.curry2 = function (nArg) {
  const argArray = [];
  const _curriedFn = (arg) => {
    argArray.push(arg);
    if (argArray.length === nArg) {
      // spreading the array into individual arguments
      return this(...argArray);
    } else {
      return _curriedFn;
    }
  };
  return _curriedFn;
};
