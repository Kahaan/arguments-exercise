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
