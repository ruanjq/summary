/**
 * @author ruanjq
 * @description gulp 打包编译 less 编译配置
 */
let gulp = require("gulp");
let path = require("path");
let $ = require('gulp-load-plugins')();

let manifest = require("./config_md5");
let IS_PROD = require("./config_process");

// 配置忽略px 转rem class 规则，不支持正则匹配，只能将完整的selector 选择器列举出来
const IGNORE_SELECTOR = [
    ".icon_collapse:after",
    ".icon_collapse:before",
    ".goods-detail-modal .close-icon::before",
    ".goods-detail-modal .close-icon::after",
    ".fast-login-inner .modal-colse::before",
    ".fast-login-inner .modal-colse::after",
    ".notification-foot .nf-close::after",
    ".notification-foot .nf-close::before",
    ".goods-img-close-wrap .goods_img_close:before",
    ".goods-img-close-wrap .goods_img_close:after",
    ".app-download-close:before",
    ".app-download-close:after",
    ".cod-popup .close-layer:before",
    ".cod-popup .close-layer:after",
    ".cod-tip-pop .close-layer:before",
    ".cod-tip-pop .close-layer:after",
    ".coupon-pop .title i:after",
    ".coupon-pop .title i:before",
    ".coupon-pop .coupon-input .icon-close:before",
    ".coupon-pop .coupon-input .icon-close:after",
    ".fbEMail .popOnBTns:after",
    ".fbEMail .popOnBTns:before",
    ".order-received .close-icon:before",
    ".order-received .close-icon:after",
];

// 下面374是代表374px不转为rem, 不用可以注释掉 
// .proImg 里面有媒体查询，这个不能转为rem
const px2remPluginConfig = {
    'width_design': 375,
    'ignore_px':[-1,1,2],
    'ignore_selector':IGNORE_SELECTOR
}


module.exports = (pathConfig) => {
    let less_path = pathConfig.less;
    return new Promise((resolve,reject) => {
        let [src,dest] = [less_path.source,less_path.output];

        gulp.src(src)
        .pipe($.if(!IS_PROD,$.changed(dest, {extension: '.css'})))  
        .pipe($.debug({title: 'gulp-less ~~~~'}))//  $.changed 只检测修改的文件
        .on('error', reject)
        .pipe($.less())
        .on('error', reject)
        .pipe($.px2remPlugin(px2remPluginConfig))
        .on('error', reject)
        .pipe($.cleanCss({
            compatibility: 'ie8'
        }))
        .on('error', reject)
        .pipe($.autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false,
            remove: false
        }))
        .on('error', reject)
        .pipe(gulp.dest(dest))
        .on('end', () => {
            if(IS_PROD){
                manifest(path.join(dest,"/**/*.css"),pathConfig).then(resolve).catch(reject);
            } else{
                resolve();
            }
        })
    })
}