/*
 * @lc app=leetcode.cn id=290 lang=javascript
 *
 * [290] 单词规律
 */

// @lc code=start
/**
 * @param {string} pattern
 * @param {string} str
 * @return {boolean}
 */
var wordPattern = function(pattern, str) {
    var p_arr = pattern.split("");
    var s_arr = str.split(" ");
    if(p_arr.length != s_arr.length) return false;
    var pMap = {};
    var sMap = {};
    for(let i = 0; i < p_arr.length; i++){
        if(!sMap[s_arr[i]]){
            sMap[s_arr[i]] = p_arr[i];
        }else{
            if(sMap[s_arr[i]] != p_arr[i]){
                return false;
            }
        }
        if(!pMap[p_arr[i]]){
            pMap[p_arr[i]] = s_arr[i];
        } else{
            if(pMap[p_arr[i]] != s_arr[i]){
                return false;
            }
        }
    }
    return true;
};
console.log(wordPattern("abba","dog dog dog dog"));
// @lc code=end

