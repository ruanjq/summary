/*
 * @lc app=leetcode.cn id=104 lang=javascript
 *
 * [104] 二叉树的最大深度
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    if(root == null){
        return 0;
    } else {
        console.log("-------");
        let left_height = maxDepth(root.left);
        console.log("left_height",left_height);
        let right_height = maxDepth(root.right);
        console.log("right_height",right_height);
        return Math.max(left_height,right_height) + 1;
    }
};

var tree = {
    val:3,
    left:{
        val:9,
        left:null,
        right:null
    },
    right:{
        val:20,
        left:{
            val:15,
            left:null,
            right:null
        },
        right:{
            val:7,
            left:null,
            right:null
        }
    }
}

console.log(maxDepth(tree));
// @lc code=end

