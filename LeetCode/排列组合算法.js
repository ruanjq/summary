/*
 *返回arr的所有长度为size的子数组的组合
 * 如arr = [1,2,3,4], size = 2
 * return [[1,2], [1,3], [1,4], [2,3], [2,4], [3,4]]
 *
 * 再如arr = [1,2,3,4], size = 3
 * return [[1,2,3], [1,2,4],[1,3,4] [2,3,4]];
 */

var a = [1, 2, 3, 4];


var ret = groupSplit(a, 3);
console.log(ret); // [[1,2], [1,3], [1,4], [2,3], [2,4], [3,4]]

function groupSplit(arr, num) {
    var result = [];
    var range = function(r, _arr) {
      if (r.length == num) {
        console.log(r);
        result.push(r)
      } else {
        let l = r.length;
        let len = _arr.length - num + l;
        console.log(len);
        for (var i = 0; i <= len; i++) {
          range(r.concat(_arr[i]), _arr.slice(i + 1))
        }
      }
    }
    range([], arr);
    return result
}