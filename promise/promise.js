

class MyPromise {
    constructor(callback) {
        this.status = "pending";
        this.successFully = [];
        this.failed = [];
        
        let resolve = data => {
            if (this.status === "pending") {
                this.status = "resolved";
                this.value = data;
                this.successFully.forEach(fn => fn(data));
            }
        }

        let reject = err => {
            if (this.status === "pending") {
                this.status = "rejected";
                this.value = err;
                self.failed.forEach(fn => fn(err));
            }
        }
        try {
            callback(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    then(onResolved, onRejected) {
        let p2 = new MyPromise((resolve,reject) => {});
        switch (this.status) {
            case "pending":
                if (typeof onResolved === "function") this.successFully.push(onResolved);
                if (typeof onRejected === "function") this.failed.push(onRejected);
                break;
            case "resolved":
                if (typeof onResolved === "function") onResolved(this.value);
                break;
            case "rejected":
                if (typeof onRejected === "function") onRejected(this.value);
                break;
        }
        return p2;
    }
}

var pm = new MyPromise(function (resolve, reject) {
    var a = 6;
    setTimeout(function () {
        if (a > 5) {
            resolve("hh");
        } else {
            reject("ww");
        }
    }, 1000);
});

pm.then(function (msg) {
    console.log("第一个成功回调执行完成",msg);
}).then(function(){
    console.log("第二个成功回调执行完成");
});



