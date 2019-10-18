/*
 * @lc app=leetcode.cn id=202 lang=javascript
 *
 * [202] 快乐数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
    let sumMap = new Map();
    let result = (function rec(number) {
        if (number <= 0) {
            return false;
        }
        if (sumMap.has(number)) {
            return false;
        }
        sumMap.set(number, number);
        let rem = number % 10;
        let num = Math.floor(number / 10);
        let sum = rem * rem;
        while (num > 0) {
            rem = num % 10;
            num = Math.floor(num / 10);
            sum += (rem * rem);
        }

        if (sum == 1) {
            return true;
        } else {
            return rec(sum);;
        }
    })(n);
    return result;
};

// console.log(isHappy(4));

// @lc code=end