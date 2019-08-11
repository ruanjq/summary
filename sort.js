function quickSort(arr){
     
}


function selectSort(arr){
    for(let j = 0; j < arr.length - 1; j++){
        let min = j;
        for(let i = j + 1; i < arr.length; i++){
            if(arr[i] < arr[min]){
                min = i;
            }
        }
        let temp = arr[j];
        arr[j] = arr[min];
        arr[min] = temp;
    }
    return arr;
}

function insetSort(arr){
    for(let i = 1; i < arr.length; i++){
        let j = i;
        while(j > 0){
            if(arr[j] < arr[j-1]){
                let temp = arr[j-1];
                arr[j-1] = arr[j];
                arr[j] = temp;
                j--;
            } else{
                break;
            }
        }
    }
    return arr;
    
}

function bubbleSort(arr){
    for(let j = arr.length - 1; j > 0; j --){
        for(let i = 0; i < j; i++){
            if(arr[i] > arr[i+1]){
                var temp = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = temp;
            }
        }
    }
        
    return arr;
}


var arr = [6,4,5,2,1,7,9,8,3];
// console.log(selectSort(arr));
// console.log(bubbleSort(arr));
console.log(insetSort(arr));
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
// sum(1,3,5)(6,7)(8);
