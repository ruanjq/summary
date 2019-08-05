
function removeElement(arr,val){
    var i = 0;
    for(var j = 0; j < arr.length;j++){
        console.log(arr[j],val);
        if(arr[j] != val){
            // arr[i] = arr[j];
            i++;
        }
    }
    return i;
}
var arr1 = [1,2,3,5,6,4,3,2,6];
var result = removeElement(arr1,6);
console.log(result);