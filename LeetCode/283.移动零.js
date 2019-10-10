/*
 * @lc app=leetcode.cn id=283 lang=javascript
 *
 * [283] 移动零
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    let count = 0;
    let len = nums.length;
    for(let i = 0; i < len; i++){
        if(nums[i] !== 0){
            nums[i - count] = nums[i];
        } else{
            count++;
        }
    }
    while(count > 0){
        nums[len-count] = 0;
        count--
    }
    return nums;
};

console.log(moveZeroes([0,1,0,3,12]));
// @lc code=end

