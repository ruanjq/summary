

var arr = [1, 2, 4, 4, 3, 3, 1, 5, 3];
// 对数组每一项循环，判断它的第一个位置和最后一个位置只要不一样就是重复值，然后在判断放置重复值的数组有没有这个值
function duplicates(arr) {
    var temp = [];
    arr.forEach(function (item) {
        if (arr.indexOf(item) !== arr.lastIndexOf(item) && temp.indexOf(item) === -1) {
            temp.push(item)
        }
    })
    return temp;
}

function duplicates1(){
    var result = [];
    arr.sort().sort((a,b) => {
        if(a == b && result.indexOf(a) === -1){
            result.push(a);
        }
    });
    return result
}

console.log(duplicates(arr));
console.log(duplicates1(arr));


// 不使用循环，创建一个长度为100的数组，并且每个元素的值等于它的下标

function createArr(length){
    var result = [];
    (function fn(index){
        if(index >= length){
            return result;
        }
        result[index] = index;
        index++;
        fn(index);
    })(0);
    return result;
}

console.log(createArr(10));

// 下面输出是什么
(function(){
    var a = b = 3;
})();
console.log("a defiend?" + (typeof a !== "undefined"));
console.log("b defiend?" + (typeof b !== "undefined"));

// 下面输出什么
var myObject = {
    foo:"bar",
    func:function(){
        var self = this;
        console.log("outer func: this.foo=" + this.foo);
        console.log("outer func: self.foo=" + self.foo);
        (function(){
            console.log("inner func: this.foo=" + this.foo);
            console.log("inner func: self.foo=" + self.foo);
        })();
    }
}

myObject.func();


// 下面这段js 代码的执行结果是什么
var handler = function(a){
    var b = 3;
    var tmp = function(a){
        b = b + a;
        return tmp;
    }
    tmp.toString = function(){
        return b;
    }
    return tmp;
}

console.log(handler(4)(5)(6));