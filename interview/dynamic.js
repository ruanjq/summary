/**
 * 
 * 动态规划算法练习 
 */ 

// 递归算法
function re_getClimbingWays(n){
    if(n <= 0){
        return 0;
    }else if(n == 1){
        return 1;
    }else if(n ==2){
        return 1;
    } else {
        return re_getClimbingWays(n - 1) + re_getClimbingWays(n - 2);
    }
}

// 备忘录算法
function getClimbingWays(n){
    if(n <= 0){
        return 0;
    }else if(n == 1){
        return 1;
    }else if(n ==2){
        return 1;
    } else {
        var obj = [];
        obj[0] = 1;
        obj[1] = 1;
        for(var i  = 2; i < n; i++){
            obj[i] = obj[i - 1] + obj[i -  2];
        }
        return obj[n-1];
    }
    
}


// 动态规划算法
function dy_getClimbingWays(n){
    if(n <= 0){
        return 0;
    }else if(n == 1){
        return 1;
    }else if(n ==2){
        return 1;
    } else {
        var a = 1;
        var b = 1;
        var temp = 0;
        for(var i  = 2; i < n; i++){
            temp = a+b;
            a = b;
            b = temp;
        }
        return temp;
    }
}

// console.log(re_getClimbingWays(10));
// console.log(getClimbingWays(10));
// console.log(dy_getClimbingWays(10));


//[华为面试题] 1分2分5分的硬币三种，组合成1角，共有多少种组合？
var ss_arr = [3,34,4,12,5,2];   // s = 9;
function subSet(arr,i,s){
    if(s == 0){
        return true;
    }else if(i == 0){
        return arr[i] == s;
    } else if(arr[i] > s) {
        return subSet(arr,i-1,s);
    } else {
        var a = subSet(arr,i-1,s-arr[i]);
        var b = subSet(arr,i-1,s);
        return a || b;
    }
}
console.log(subSet(ss_arr,5,9));