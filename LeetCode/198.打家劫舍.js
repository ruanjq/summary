/*
 * @lc app=leetcode.cn id=198 lang=javascript
 *
 * [198] 打家劫舍
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
/* var rob = function(nums) {
    let result = (function rec(n,k){
        if(k === -1 || k === 0){
            return 0;
        }
        let prev = rec(n,k-2) + n[k-1];
        let next = rec(n,k-1);
        return Math.max(prev,next);
    })(nums,nums.length);
    return result;
};
 */


 var rob = function(nums){
     let prevMax = 0;
     let currMax = 0;
     for(let i = 0; i < nums.length; i++){
        let temp = currMax;
        currMax = Math.max(prevMax + nums[i],currMax);
        prevMax = temp;
     }
     return currMax;
 }


console.log(rob([10,1,1,10]));
// @lc code=end