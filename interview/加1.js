


function plusOne(digst){
    if(digst == 0){
        return 0;
    }
    for(let i = digst.length-1; i >= 0;i--){
        digst[i]++;
        digst[i] %= 10;
        if(digst[i] != 0){
            return digst;
        }
    }
    digst = new Array(digst.length + 1).fill(0);
    digst[0] =  1;
    return digst;
}

console.log(plusOne([9,9,9]));