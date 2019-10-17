// 求数组中前n 个数的最大值

var a = [4,3,9,7,11,45,6,2,78];


function maxVal(arr,n){
    if(n == 0){
        return arr[0]
    }else{
        let t = maxVal(arr,n-1);
        if(t > arr[n]){
            return t;
        } else{
            return arr[n];
        }
    }
}

console.log(maxVal(a,4));