var g = function (x, y) {
  return x + 2 * y
}

var f = function (y) {
  return g(1, y)
}
f(1, 2)   // 5
//以上就是柯里化  柯里化就是一个函数调用另一个函数，调用的那个函数且可以传一个参数


var cache = [],
var add = function (n) {
  if (n === undefined) {
    return cache.reduce((p, n) => p + n, 0)
  } else {
    cache.push(n)
    return add
  }
}

add(1)(2)(3)(4)()  //10

//偏函数  
//柯里化的库_.partial 可以把函数变为偏函数