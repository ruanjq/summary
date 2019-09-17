let script = require("././config_script");
let less = require("./config_less");
let template = require("./config_template");
let sprite = require("./config_sprite");
 
/**
 * 
 * @param {*} buildParams   npm run build 参数 
 *                          如 npm run build m=skin3_en t=less
 */
let buildTask = (config_path) => {
    let build_queue = [];
    for(let cp in config_path){
        let item = config_path[cp];
        let task = () => {
            return new Promise((resolve, reject) => {
                Promise.resolve().then(() => {
                    if (item.sprite) {
                        return sprite(item);
                    } else {
                        return Promise.resolve();
                    }
                }).then(() => {
                    if (item.less) {
                        return less(item);
                    } else {
                        return Promise.resolve();
                    }
                }).then(() => {
                    if (item.script) {
                        return script(item);
                    } else {
                        return Promise.resolve();
                    }
                }).then(() => {
                    if (item.template) {
                        return template(item);
                    } else {
                        return Promise.resolve();
                    }
                }).then(resolve).catch(reject);
            })
        }
        build_queue.push(task);
    }
    return new Promise((resolve,reject) => {
        (function buildRec(bq){
            if(bq.length == 0){
                return resolve();
            }
            let callback = bq.shift();
            callback().then(() =>{
                buildRec(bq);
            }).catch(err => {
                reject(err);
            })
        })(build_queue);
    });
}

 

module.exports = buildTask;
 


