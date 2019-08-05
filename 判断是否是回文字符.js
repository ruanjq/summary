


function isPali(w){
    let len = w.length;
    let mid = (len/2) | 0;
    console.log(mid);
    while(mid>=0){
        if(w[mid] !== w[len - mid - 1]){
            return false;
        }
        mid--;
    }
    return true;
}

console.log(isPali("abcxcba"));


// 交换2个数，不借助变量
let a = 1;
let b = 2;
a = a - b;  
b = b + a;  //  b = b + a - b   // b = a;
a = b - a; //   a = a - a + b   // a = b