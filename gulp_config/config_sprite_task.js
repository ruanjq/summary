 
let less = require("./config_less");
let sprite = require("./config_sprite");
 
let spriteTask = (folderName,config_path) => {
    let spriteQueue = [];
    for(let cp in config_path){
        let item = config_path[cp];
        spriteQueue.push(sprite.bind(null,item,folderName));
    }
    // 有一个执行成功就算成功，
    let sq_resolve_count = 0;
    let errMes = null;
    return new Promise((resolve,reject) => {
        ;(function sqRec(arr){
            if(arr.length == 0){
                if(sq_resolve_count > 0){
                    return resolve();
                }else{
                    return reject(errMes)
                }
            }
            let callback = arr.shift();
            callback().then((pathConfig) => {
                // 雪碧图合并成功后。还需要调用less 任务执行
                if(pathConfig.less){
                    return less(pathConfig);
                } else{
                    return Promise.resolve();
                }
            }).then(() => {
                sq_resolve_count ++;
                sqRec(arr);
            }).catch(err => {
                errMes = err;
                sqRec(arr);
                
            })
        })(spriteQueue);
    })
}
module.exports = spriteTask;


