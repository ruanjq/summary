
let gulp = require("gulp");
let path = require("path");
let $ = require('gulp-load-plugins')();
let manifest = require("./config_md5");
let IS_PROD = require("./config_process");

module.exports = function(pathConfig){
    let script_path = pathConfig.script;
    return new Promise((resolve,reject) => {
        let [src,dest] = [script_path.source,script_path.output];
        gulp.src(src)
        .pipe($.if(!IS_PROD,$.changed(dest, {extension: '.min.js'})))  //  $.changed 只检测修改的文件
        // 合并文件 方式：//=require ./xxx.js
        .pipe($.include())
        .on('error', reject)
        .pipe($.uglify())
        .on('error', reject)
        .pipe($.rename({
            suffix: '.min'
        }))   
        .pipe($.debug({title: 'gulp-script ~~~~'}))
        .pipe(gulp.dest(dest))
        .on('end', () => {
            if(IS_PROD){
                manifest(path.join(dest,"/**/*.js"),pathConfig).then(resolve).catch(reject);
            } else{
                resolve();
            }   
        })
    })
}

 