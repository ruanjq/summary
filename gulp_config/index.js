let handler = require("./config_hanlder");
let configProcess = require("./config_process");
let configPathPromise = require("./config_path_filter");
let watcher = require("./config_watch_task");
let buildTask = require("./config_build_task");
let spriteTask = require("./config_sprite_task");

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
    }).catch(err => {
        handler.error(`npm run dev error,错误消息:`, err);
        process.exit();
    });
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



