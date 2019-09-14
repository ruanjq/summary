/**
 * 获取命令行参数
 * m=skin2_en t=less
 * m 表示执行 config_path 配置中的module 名称
 * t 标识执行指定的 task 任务 如[less,sprite,script,template]
 */

let configPath = require("./config_path");

/**
 * 获取命令行参数
 * m=skin2_en t=less
 * m 表示执行 config_path 配置中的module 名称
 * t 标识执行指定的 task 任务 如[less,sprite,script,template]
 */
let getScriptsParams = () => {
    let result = {
        m: "",
        t: ""
    }
    let pa_arr = process.argv.slice(2);
    if (pa_arr.length > 0) {
        pa_arr.forEach(item => {
            let regMM = item.match(new RegExp('m=(.*)'));
            let regMT = item.match(new RegExp('t=(.*)'));
            if (regMM && regMM[1]) {
                result.m = regMM[1];
            }
            if (regMT && regMT[1]) {
                result.t = regMT[1];
            }
        })
        return result;
    } else {
        return null;
    }
}

module.exports = () => {

    return new Promise((resolve, reject) => {
        let params = getScriptsParams();
        if (!params || (params.m === "" && params.t === "")) {
            return resolve(configPath);
        } else {
            // 过滤指定 modules 过滤指定 task
            let result = {};
            if (params.m !== "" && params.t !== "") {
                if (!configPath[params.m]) {
                    return reject(`未在config_path.js 配置文件中找到${params.m}模块名称`);
                }
                for (let moduleName in configPath) {
                    let task = configPath[moduleName];
                    if(!task[params.t]){
                        return reject(`未在config_path.js 配置文件${params.m}模块中找到 ${params.t} 任务`);
                    }
                    if (params.m === moduleName) {
                        for (let taskName in task) {
                            if (taskName === params.t || taskName === "rev_manifest") {
                                if (!result[moduleName]) {
                                    result[moduleName] = {};
                                }
                                result[moduleName][taskName] = task[taskName];
                            }
                        }
                    }
                }
            } else if (params.m !== "" && params.t === "") {
                if (!configPath[params.m]) {
                    return reject(`未在config_path.js 配置文件中找到${params.m}模块名称`);
                }
                for (let moduleName in configPath) {
                    let task = configPath[moduleName];
                    if (params.m === moduleName) {
                        result[moduleName] = task;
                    }
                }
            } else if (params.m === "" && params.t !== "") {
                for (let moduleName in configPath) {
                    let task = configPath[moduleName];
                    if(!task[params.t]){
                        return reject(`未在config_path.js 配置文件${params.m}模块中找到 ${params.t} 任务`);
                    }
                    for (let taskName in task) {
                        if (taskName === params.t || taskName === "rev_manifest") {
                            if (!result[moduleName]) {
                                result[moduleName] = {};
                            }
                            result[moduleName][taskName] = task[taskName];
                        }
                    }
                }
            }
            resolve(result);
        }
    })
}