
/**
 * 
 * 客路旅行web前端面试题压轴题，请根据以下例子，实现异步的compose 函数  compose(...functions)
 * 
 *  Example ---------------------------
 *  
 *  function add1(n,callback){
        setTimeout(function(){
            callback(null,n+1)
        },10);
    }

    function mul3(n,callback){
        setTimeout(function(){
            callback(null,n*3);
        },10);
    }
    
    var add1mul3 = compose(mul3,add1);
    add1mul3(4,function(err,result){
        // result now equals 15
    })
 *  
 */


function add1(n,callback){
    setTimeout(function(){
        callback(null,n+1)
    },10);
}

function mul3(n,callback){
    setTimeout(function(){
        callback(null,n*3);
    },10);
}

 

function compose(){
    let argsFn = [].slice.apply(arguments);
    let promiseArr = argsFn.map( fn => {
        return function(n){
            return new Promise((resolve,reject) => {
                fn(n,function(obj,number){
                    resolve(number);
                });
            });
        }
    });

    function excutor(arr,value){
        return new Promise((resolve,reject) => {
            try {
                (function rec(a,v) {
                    if(a.length === 0){
                        return resolve(v);
                    }
                    let fn = a.pop();
                    fn(v).then(function(num){
                        rec(a,num);
                    });
                })(arr,value);
            } catch (error) {
                return resolve(error);
            }
        });
    }

    return function(x,cb){
        excutor(promiseArr,x).then(function(result){
            if(result instanceof Error){
                cb(result,undefined);
            }else {
                cb(null,result);
            }
        });
    }
}
 
var add1mul3 = compose(mul3,add1);
add1mul3(4,function(err,result){
    console.log(result);
})
 