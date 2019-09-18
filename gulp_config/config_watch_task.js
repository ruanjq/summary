let fs = require("fs");
let watch = require('gulp-watch');

let script = require("././config_script");
let less = require("./config_less");
let template = require("./config_template");
let handler = require("./config_hanlder");

let wacthLessRemove = (path_params,removeFile) => {
    handler.error("remove file ",removeFile);
    let opPath = removeFile.replace(...(path_params.less.delReplaceMatch)).replace(/\.less/,".css")
    if(fs.existsSync(opPath)){
        fs.unlinkSync(opPath);
        handler.error("remove file ",opPath);
    };
}

let wacthScriptRemove = (path_params,removeFile) => {
    handler.error("remove file ",removeFile);
    let opPath = removeFile.replace(...(path_params.script.delReplaceMatch)).replace(/\.js/,".min.js")
    if(fs.existsSync(opPath)){
        fs.unlinkSync(opPath);
        handler.error("remove file ",opPath);
    };
}

let wacthTemplateRemove = (path_params,removeFile) => {
    handler.error("remove file ",removeFile);
    let opPath = removeFile.replace(...(path_params.template.delReplaceMatch))
    if(fs.existsSync(opPath)){
        fs.unlinkSync(opPath);
        handler.error("remove file ",opPath);
    };
}

const READ_DELAY = 50;
let watcher = (path_params) => {
    if (path_params.less) {
        watch(path_params.less.source,{readDelay:READ_DELAY}).on('add', function(file){
            handler.info('add file ' + file);
		}).on('change', function(file){
            less(path_params).then(handler.success).catch((err) => {
                handler.error(`gulp-less Error ====== >`, err);
            });
		}).on('unlink', function(file){
            wacthLessRemove(path_params,file);
		});
    }

    if (path_params.script) {
        watch(path_params.script.source,{readDelay:READ_DELAY}).on('add', function(file){
            handler.info('add file ' + file);
		}).on('change', function(file){
            script(path_params).then(handler.success).catch((err) => {
                handler.error(`gulp-script Error ====== >` + err);
            });
		}).on('unlink', function(file){
            wacthScriptRemove(path_params,file);
		});         
    }

    if (path_params.template) {
        watch(path_params.template.source,{readDelay:READ_DELAY}).on('add', function(file){
            handler.info('add file ' + file);
		}).on('change', function(file){
            template(path_params).then(handler.success).catch((err) => {
                handler.error(`gulp-template Error ====== >`, err);
            });
		}).on('unlink', function(file){
            wacthTemplateRemove(path_params,file);
		});
    }
}

module.exports = watcher;