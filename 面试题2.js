
// 假设文章内容触及一些敏感词汇，["习近平","周永康","中共","6.4"]等内容，如何在文章中发现这些敏感词，并将背景设置为红色或改变字体颜色并表示出来
var content = "冒号，监听爱的那是哪三社联动按时到那时中共,asdas 习近平<asdnsakdn 周勇康,6,4具体";

var dangerArr = ["习近平","周永康","中共","6.4"];

function repleaceContent(content,dangerArr){
    content || "";
    for(let i = 0; i < dangerArr.length; i++){
        var reg = new RegExp(dangerArr[i],"g");
        content = content.replace(reg,function(word){
            return "<b class='bg-red'>"+word+"</b>";
        });
    }

    return content;
}
console.log(repleaceContent(content,dangerArr));



function fun(n,o){
    console.log(o);
    return{
        fun:function(m){
            return fun(m,n);
        }
    }
}

var a = fun(0);  // undefined 
a.fun(1);  // 0;
a.fun(2);  // 0
a.fun(3);  // 0

var b = fun(0).fun(1).fun(2).fun(3);  // undefined  0  1  2 

var c = fun(0).fun(1);   // undefined 1  

c.fun(2); c.fun(3); // 1  1

// 问三行a,b,c,分别输出什么



var a = 100;
function testResult(){
    var b = 2*a;
    var a = 200;
    var c = a / 2;
    console.log(b);
    console.log(c);
}

testResult();  // NaN  100;


