let gulp = require("gulp");
let del = require('del');
let script = require("././config_script");
let less = require("./config_less");
let template = require("./config_template");
let sprite = require("./config_sprite");
let handler = require("./config_hanlder");
let configProcess = require("./config_process");
let configPathPromise = require("./config_path_filter");

const WATCHER_INTERVAL = 500;
let watcher = (path_params) => {
    if (path_params.less) {
        gulp.watch(path_params.less.source, {
            interval: WATCHER_INTERVAL
        }).on('change', event => {
            if (event.type === 'deleted') {
                del(event.path.replace(/\less/, '\css').replace(/.less$/, '.css'))
            } else if (event.type === "changed") {
                less(path_params).then(handler.success).catch((err) => {
                    handler.error(`gulp-less Error ====== >`, err);
                });
            }
        })
    }

    if (path_params.script) {
        gulp.watch(path_params.script.source, {
            interval: WATCHER_INTERVAL
        }).on('change', event => {
            if (event.type === 'deleted') {
                del(event.path.replace(/\js/, '\minjs').replace(/\.js$/, '.min.js'))
            } else if (event.type === "changed") {
                script(path_params).then(handler.success).catch((err) => {
                    handler.error(`gulp-script Error ====== >` + err);
                });
            }
        })
    }

    if (path_params.template) {
        gulp.watch(path_params.template.source, {
            interval: WATCHER_INTERVAL
        }).on('change', event => {
            if (event.type === 'deleted') {
                del(event.path.replace(/template/, 'template_out'))
            } else if (event.type === "changed") {
                template(path_params).then(handler.success).catch((err) => {
                    handler.error(`gulp-template Error ====== >`, err);
                });
            }
        })
    }
}

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


if(configProcess.IS_DEV){
    handler.info("~~~~~~~~~~~~~~~~~~~~~~~~");
    handler.info("当前进入gulp dev 开发模式");
    handler.info("~~~~~~~~~~~~~~~~~~~~~~~~");
    let socket = require("./config_socket");
    socket();
    configPathPromise().then(config => {
        for(let cp in config){
            let item = config[cp];
            watcher(item);
        }
    })
} else if(configProcess.IS_TASK_SPRITE){ 
    // sprite 命令单独编译，不自动监听，防止性能太卡
    let pa_length = process.argv.length;
    if(pa_length != 3){
        handler.error(`Sprite Error,请在命令行中传递文件夹参数,`,"");
        return;
    }
    let folderName = process.argv.pop();
    configPathPromise().then(config => {
        return spriteTask(folderName,config);
    }).then(() => {
        handler.info("~~~~~~~~~~~~~~~~~~~~~~~~");
        handler.info(`恭喜您!,/${folderName} 文件夹下的,sprite 编译成功!!!`);
        handler.info("~~~~~~~~~~~~~~~~~~~~~~~~");
        process.exit();
    }).catch(err => {
        handler.error(`Sprite Error , 编译失败`, err);
        process.exit();
    });
} else if(configProcess.IS_PROD){
    handler.info("~~~~~~~~~~~~~~~~~~~~~~~~");
    handler.info("当前进入gulp Prod build 编译模式");
    handler.info("~~~~~~~~~~~~~~~~~~~~~~~~");
    configPathPromise().then((config) => {

        return buildTask(config);
    }).then(() => {
        handler.info("~~~~~~~~~~~~~~~~~~~~~~~~");
        handler.info("恭喜,所有任务编译成功!!!");
        handler.info("~~~~~~~~~~~~~~~~~~~~~~~~");
        process.exit();
    }).catch(err => {
        handler.error(`编译失败,错误消息:`, err);
        process.exit();
    });
}



