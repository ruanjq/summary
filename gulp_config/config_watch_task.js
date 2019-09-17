let gulp = require("gulp");
let script = require("././config_script");
let less = require("./config_less");
let template = require("./config_template");
let fs = require("fs");
let handler = require("./config_hanlder");

let wacthLessRemove = (path_params,removeFile) => {
    handler.error("gulp less wacth event type ====> deleted  remove file",removeFile);
    let opPath = removeFile.replace(...(path_params.less.delReplaceMatch)).replace(/\.less/,".css")
    if(fs.existsSync(opPath)){
        fs.unlinkSync(opPath);
        handler.error("gulp wacth event type ====> deleted  remove file",opPath);
    };
}


let wacthScriptRemove = (path_params,removeFile) => {
    handler.error("gulp script wacth event type ====> deleted  remove file",removeFile);
    let opPath = removeFile.replace(...(path_params.script.delReplaceMatch)).replace(/\.js/,".min.js")
    if(fs.existsSync(opPath)){
        fs.unlinkSync(opPath);
        handler.error("gulp wacth event type ====> deleted  remove file",opPath);
    };
}

let wacthTemplateRemove = (path_params,removeFile) => {
    handler.error("gulp wacth event type ====> deleted  remove file",removeFile);
    let opPath = removeFile.replace(...(path_params.template.delReplaceMatch))
    if(fs.existsSync(opPath)){
        fs.unlinkSync(opPath);
        handler.error("gulp wacth event type ====> deleted  remove file",opPath);
    };
}

const WATCHER_INTERVAL = 100;
let watcher = (path_params) => {
    if (path_params.less) {
        gulp.watch(path_params.less.source, {
            interval: WATCHER_INTERVAL
        }).on('change', event => {
            if (event.type === 'deleted') {
                wacthLessRemove(path_params,event.path);
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
                wacthScriptRemove(path_params,event.path);
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
                wacthTemplateRemove(path_params,event.path);
            } else if (event.type === "changed") {
                template(path_params).then(handler.success).catch((err) => {
                    handler.error(`gulp-template Error ====== >`, err);
                });
            }
        })
    }
}

module.exports = watcher;