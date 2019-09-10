let chalk = require('chalk');
let util = require("util");
let has_error = false;
let msgFormat = (title, err) => {
    let msg = new Error(err).toString();
    msg = msg.replace(/\n/g, '\\A ').replace(/'/g, "\"");
    title = title.replace(/\n/g, '\\A ').replace(/'/g, "\"");
    return util.format('<style id="gulp-notification-style">body:before { background: rgba(0, 0, 0, 0.8); padding: 15px;' +
        'position: fixed; left: 0; right: 0;top: 0; bottom: 0; z-index: 99999;' +
        'overflow-y: auto;  color: red; font-size: 16px;' +
        'white-space: pre-wrap; font-family: monospace;' +
        'content: \'%s %s\';}</style>', title, msg);
}
module.exports = {
    error: (title, err) => {
        if (global.socket_client) {
            has_error = true;
            global.socket_client.emit('gulpError', { msg: msgFormat(title, err, "error") });
        }
        console.log(chalk.bold.red(title, err));
    },
    info: info => {
        console.log(chalk.bold.green(info));
    },
    success:() => {
        // 通知客户端编译成功，删除页面错误提示信息
        if (global.socket_client && has_error) {
            has_error = false;
            global.socket_client.emit('gulpSuccess', { msg: "编译成功" });
        }
    }
}