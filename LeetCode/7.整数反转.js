/*
 * @lc app=leetcode.cn id=7 lang=javascript
 *
 * [7] 整数反转
 */
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    if(x == 0) return x;
    let num = x;
    let result = 0;
    while(num != 0){
        let rem = num % 10;
        num = parseInt(num / 10);
        result = result * 10 + rem;
        if(result<(-2)**31 || result > (2**31)-1){
            return 0;
        }
    }
    return result;
};


// console.log(reverse(1534236469));


