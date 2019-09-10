

// 执行以下结果输出什么 10
var z = 10;
function foo(){
    console.log(z);
}
(function(funArg){
    var z = 20;
    funArg();
})(foo);



// 执行以下代码输出什么   3 3 3
var data = [];
for(var i = 0; i < 3; i++){
    data[i] = function(){
        console.log(i);
    }
}
data[0]();
data[1]();
data[2]();


// 获取以下数字，并以数组形式输出
var str = "sdasd3434sdfdsoehe34323kfgnkn3232k2k3n23";
console.log(str.match(/(\d+)/g));


// 输入一个长度为9的数组[1,2,3,4,2,2,2,5,2] 由于数字2在数组中出现了5次，超过数组长度的一半，因此输出2，如果不存在，则输出0;

function getNumByArray(arr){
    let result = 0;
    let obj = {};
    for(let i = 0; i < arr.length; i++){
        if(!obj[arr[i]]){
            obj[arr[i]] = 1;
        }else{
            obj[arr[i]]++;
        }
        if(obj[arr[i]] > arr.length/2){
            return arr[i];
        }
    }
    return result;
}
console.log(getNumByArray([1,2,3,4,2,2,2,5,2]));



// 如何判断2个JOSN 对象的值是否完全相等，请写出代码，如 {x:1,y:1} 与{y:1,x:1} 是相等的，与{x:1,y:1,z:1} 是不同的

function jsonHasEqual(j1,j2){
    var hasEqual = true;
    if(Object.getOwnPropertyNames(j1).length != Object.getOwnPropertyNames(j2).length){
        return false;
    }
    for(let i in j1){
        if(j1[i] instanceof Object){
            if(![j2]){
                return false;
            } else {
                hasEqual = jsonHasEqual(j1[i],j2[i]);
            }
        } else if(j1[i] instanceof Array){
            if(![j2]){
                return false;
            } else {
                hasEqual = jsonHasEqual(j1[i],j2[i]);
            }
        } else if(j1[i] != j2[i]){
            return false;
        }
    }
    return hasEqual;
}


var j1 = {x:1,y:1,z:{a:1,b:{v:[{a:1},2,3,4]}}};  var j2 = {x:1,y:1,z:{a:1,b:{v:[{a:1},2,3,4]}}};
// var j1 = {v:[{a:1},2,3,4]};  var j2 = {v:[{a:1},2,1,4]}
console.log(jsonHasEqual(j1,j2));