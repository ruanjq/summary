// new Man('lan').sleep(3).eat('apple').sleep(5).eat('banana');
// 'hello, lan' -(等待3s)--> 'lan eat apple' -(等待5s)--> 'lan eat banana'

class Man{
    constructor(name){
        this.name = name;
        this.say();
        this.p1 = Promise.resolve();
    }
    say(){
        console.log(`hello, ${this.name}`);
    }

    sleep(delay){
        this.p1 = this.p1.then(function(){
            return new Promise(function(resolve){
                setTimeout(function(){
                    resolve();
                },delay * 1000);
            },function(){});
        });
        return this;
    }

    eat(food){
        this.p1.then(function(){
            console.log(food);
        });
        return this;
    }
    
}

new Man('lan').sleep(3).eat('apple').sleep(5).eat('banana');


class Person{

    constructor(){
        this.p1 = Promise.resolve();
    }

    sleep(delay){
        this.p1 = this.p1.then(function(){
            return new Promise(function(resolve){
                setTimeout(function(){
                    resolve();
                },delay * 1000);
            });
        });
        return this;
    }
    say(msg){
        this.p1.then(function(){
            console.log(msg);
        });
    }
}




// new Person().sleep(1).sleep(2).sleep(3).say("haha");




