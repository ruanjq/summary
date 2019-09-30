/*
 * @lc app=leetcode.cn id=189 lang=javascript
 *
 * [189] 旋转数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
    if(k <= 0){
        return nums;
    }    
    let numsLen = nums.length;
    let step = 0;
    while(step < k){
        for(let i = 1; i < numsLen; i++){
            let temp = nums[i];
            nums[i] = nums[0];
            nums[0] = temp;
        }
        step++;
    }
    return nums;
};

console.log(rotate([-1,-100,3,99],2));
// @lc code=end

