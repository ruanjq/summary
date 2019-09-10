let gulp = require("gulp");
let del = require('del');
let config_path = require("./config_path");
let script = require("././config_script");
let less = require("./config_less");
let template = require("./config_template");
let sprite = require("./config_sprite");
let handler = require("./config_hanlder");
let socket = require("./config_socket");
// 前端项目根目录文件夹名称，如存在其他多语言模板，则扩展这个数组对象，往数组添加文件夹路径

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

let buildTask = () => {
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

let spriteTask = (folderName) => {
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

gulp.task('default', () => {
    handler.info("~~~~~~~~~~~~~~~~~~~~~~~~");
    handler.info("当前进入gulp dev 开发模式");
    handler.info("~~~~~~~~~~~~~~~~~~~~~~~~");
    socket();
    for(let cp in config_path){
        let item = config_path[cp];
        watcher(item);
    }
});

// sprite 命令单独编译，不自动监听，防止性能太卡
gulp.task('sprite', () => {
    let pa_length = process.argv.length;
    if(pa_length != 5){
        handler.error(`Sprite Error,请在命令行中传递文件夹参数,`,"");
        return;
    }
    let folderName = process.argv.pop();
    spriteTask(folderName).then(() => {
        handler.info("~~~~~~~~~~~~~~~~~~~~~~~~");
        handler.info(`恭喜您!,/${folderName} 文件夹下的,sprite 编译成功!!!`);
        handler.info("~~~~~~~~~~~~~~~~~~~~~~~~");
        process.exit();
    }).catch(err => {
        handler.error(`Sprite Error , 编译失败`, err);
        process.exit();
    });
});

gulp.task('build', () => {
    handler.info("~~~~~~~~~~~~~~~~~~~~~~~~");
    handler.info("当前进入gulp Prod build 编译模式");
    handler.info("~~~~~~~~~~~~~~~~~~~~~~~~");
    buildTask().then(() => {
        handler.info("~~~~~~~~~~~~~~~~~~~~~~~~");
        handler.info("恭喜,所有任务编译成功!!!");
        handler.info("~~~~~~~~~~~~~~~~~~~~~~~~");
        process.exit();
    }).catch(err => {
        handler.error(`编译失败,请检查代码后重试,错误消息:`, err);
        process.exit();
    });
});