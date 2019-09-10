/**
 * @author ruanjq
 * @description gulp 打包编译 rev 文件md5 版本号配置
 */

let gulp = require("gulp");
let $ = require('gulp-load-plugins')();
module.exports = (src,pathConfig) => {
    return new Promise((resolve,reject) =>{
        gulp.src(src)
        .pipe($.revV())
        .on('error', reject)
        .pipe($.revV.manifest({
            merge: true,
            path:pathConfig["rev_manifest"].fileName
        }))
        .on('error', reject)
        .pipe($.debug({title: 'gulp-rev-manifest ~~~~'}))
        .pipe(gulp.dest(pathConfig["rev_manifest"].output))
        .on("end",() => {
            resolve();
        })
    });
}