/**
 * @author ruanjq
 * @description gulp 打包编译 template 模板相关配置
 */



let gulp = require("gulp");
let path = require("path");
let $ = require('gulp-load-plugins')();
let configProcess = require("./config_process");

// 
module.exports = (pathConfig) => {
    let template_path = pathConfig.template;
    return new Promise((resolve,reject) => {
        let [src,dest] = [template_path.source,template_path.output];
        if(!src || !(src instanceof Array)){
            reject(`template source 源文件参数不是数组类型`);
            return;
        }
        // 生产环境加载 manifest.json 添加md5 版本号
        if(configProcess.IS_PROD){
            src.push(path.join(pathConfig["rev_manifest"].output,pathConfig["rev_manifest"].fileName))
        }
        gulp.src(src)
        .pipe($.if(!configProcess.IS_PROD,$.changed(dest, {extension: ".html"})))  //  $.changed 只检测修改的文件
        .pipe($.if(!configProcess.IS_PROD,$.changed(dest, {extension: ".htm"})))  //  $.changed 只检测修改的文件
        // 模板内联文件
        .pipe($.inlineSource({
            compress: false,
            swallowErrors: true
        }))
        .on('error', reject)
        // 压缩模板、删除注释
        .pipe($.htmlclean())
        // 加上 md5版本号
        .pipe($.if(configProcess.IS_PROD,$.revCollectorV({
            replaceReved: true
        })))
        .on('error', reject)
        .pipe($.debug({title: 'gulp-template ~~~~'}))
        .pipe(gulp.dest(dest))
        .on("end",() => {
            resolve();
        })
    });

}