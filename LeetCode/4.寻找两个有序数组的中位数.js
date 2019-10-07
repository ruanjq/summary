/*
 * @lc app=leetcode.cn id=4 lang=javascript
 *
 * [4] 寻找两个有序数组的中位数
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    nums1.push(...nums2);
    nums1 = nums1.sort(function(a,b){return b-a});
    let len = nums1.length;
    let midd = Math.floor(len / 2);
    if(len % 2 !== 0){
        return nums1[midd];
    } else {
        let prev = midd - 1;
        return (nums1[midd] + nums1[prev]) / 2;

    }
};



 
console.log(findMedianSortedArrays([3],[-2,-1]));
// @lc code=end

