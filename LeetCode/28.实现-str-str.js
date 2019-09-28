/*
 * @lc app=leetcode.cn id=28 lang=javascript
 *
 * [28] 实现 strStr()
 */

// @lc code=start
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    if(needle === ""){
        return 0;
    }
    if(haystack === needle){
        return 0;
    }
    let result = -1;
    let hLen = haystack.length;
    let nLen = needle.length;
    if(nLen > hLen){
        return result;
    }
    
    for(let i = 0; i < hLen; i++){
        let j = 0;
        let starStr = needle[j];
        if(haystack[i] === starStr){
            while(j < nLen){
                if(haystack[i+j] === needle[j]){
                    if(j === nLen - 1){
                        return i;
                    }
                }else{
                    break;
                }
                j++;
            }
        }
    }
    return result;
};

console.log(strStr("mississippi","sipp"));
// console.log(strStr("hello","ello"));
// @lc code=end

