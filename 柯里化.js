var g = function(x,y){
	return x+2*y
}

var f = function(y){
	return g(1,y)
}
f(1,2)   // 5
//以上就是柯里化  柯里化就是一个函数调用另一个函数，调用的那个函数且可以传一个参数