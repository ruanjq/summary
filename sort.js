function quickSort(arr){
    if(arr.length <= 1){
        return arr;
    }
    var left = [];
    var right = [];
    var temp = arr[0];
    for(var i = 1; i < arr.length; i++){
        if(arr[i] < temp){
            left.push(arr[i]);
        }else {
            right.push(arr[i]);
        }
    }
    var leftvalue = quickSort(left);
    var rightvalue = quickSort(right);
    var result = leftvalue.concat(temp,rightvalue);
    return result;
}


function selectSort(arr){
    var arrcopy = arr.slice();
    for(var i = arrcopy.length; i > 0; i--){
        var mv = 0;
        var mi = 0;
        for(var j = 0; j < arrcopy.length; j++){
            if(arrcopy[j]>=mv){
                arrcopy[j] = mv;
                mi = j;
            }
        }
        var lastvalue = arrcopy[arrcopy.length-1];
        if(lastvalue > mv){
            arr[mi] = lastvalue;
            arr[arrcopy.length-1] = mv;
            arrcopy.splice(arrcopy.length-1,1);
        }
    }
    return arr;
}

function insetSort(arr){
    for(var i = 1; i < arr.length; i++){
        var temp = arr[i];
        var j = i;
        while(arr[j-1] > temp && j > 0){
            arr[j] = arr[j-1];
            arr[j-1] = temp;
            j--;
        } 
    }
    return arr;
}

function bubbleSort(arr){
    for(var i = 0; i < arr.length; i++){
        for(var j = 0; j < arr.length-i-1; j++){
            var temp = arr[j];
            if(temp > arr[j+1]){
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
    return arr;
}


var arr = [6,4,5,2,1,7,9,8,3];
// console.log(insetSort(arr));
// console.log(bubbleSort(arr));
// console.log(insetSort(arr));
// console.log(quickSort(arr));


function sum(){
    var args = [].push.call(arguments);
    console.log(args);
    console.log(arguments);
    return function(){
        console.log(arguments);
        return function(){
            console.log(arguments);
        }
    }
}

// sum(1)(2)(3)();  
sum(1,3,5)(6,7)(8);
