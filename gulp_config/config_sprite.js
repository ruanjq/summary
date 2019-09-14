let gulp = require("gulp");
let $ = require('gulp-load-plugins')();
let hanlder = require("./config_hanlder");
let path = require("path");
let buffer = require('vinyl-buffer');
let fs = require("fs");
let revHash = require('rev-hash');
let configProcess = require("./config_process");


// tinypng 网站压缩图片优化
let compressImage = showLog => {
    return $.tinypngCompress({
        key: 'HcQbW9L7vZ2YwgxftR1NpJQ9VsW9nlmL', // https://tinypng.com/developers/subscription
        log: showLog || false
    })
}

let readSpritesFolder = (dir) => {
    if (fs.existsSync(dir)) {
        return fs.readdirSync(dir).filter(item =>{
            // 过滤以点开头的文件夹，mac os 系统存在 .DS_Store 隐藏文件夹
            return !/^\./.test(item)
        });
    } else {
        return [];
    }
}



let task = sprite_path => {
    return new Promise((resolve, reject) => {
        let dest = sprite_path.output;
        let src = sprite_path.source;
        let fileName = sprite_path.fileName; // 合并文件的文件名称
        let spriteDir = path.parse(src).dir;
        let dirFolder = sprite_path.dirFolder;
        let imgPath = sprite_path.imgPath;

        if (!dest) {
            return reject(`雪碧图输出路径参数不存在，请检查后再试`);
        }
        
        if (!fs.existsSync(dest)) {
            // 生产模式，不存在文件夹直接跳过，resolve
            // 开发模式 npm run sprite folder 不存在文件夹reject 失败
            if(configProcess.IS_PROD){
                return resolve();
            } else{
                return reject(`未在 config_path.js 配置文件中找到 /${dirFolder} 该文件夹,请检查后重试`);
            }
        }

        if (!src) {
            return reject(`小图标源文件参数不存在，请检查后再试`);

        }

        if (!fileName) {
            return reject(`雪碧图文件名称参数为空，请检查后再试`);
        }

        // 判断子目录是否存在 sprite 文件路径
        if (!fs.existsSync(spriteDir)) {
            // console.log("不存在文件夹",spriteDir);
            return resolve();
        }

        // 判断小图标是否存在
        if (!fs.readdirSync(spriteDir).length) {
            // reject(`请将切好的png文件放在目录 ${src} 后再执行 gulp sprite `);
            // return;
            return resolve();
        }

        // 检测是否含有二倍图


        // 读取 sprite.png 加 md5 版本号
        let spritePngPath = path.resolve(dest, `${fileName}.png`);
        let spriteHash = fs.existsSync(spritePngPath) ? revHash(fs.readFileSync(spritePngPath)) : '1';
        // 开始合并图片
        let spriteData = gulp.src(src)
            .on('error', hanlder.error)
            .pipe($.spritesmith({
                imgName: `${fileName}.png`,
                cssName: `${fileName}.less`,
                padding: 4,
                imgPath: `${imgPath}/${fileName}.png?v=${spriteHash}`,
                // Retina parameters
                retinaSrcFilter: [path.resolve(spriteDir, '*@2x.png')],
                retinaImgName: `${fileName}@2x.png`,
                retinaImgPath: `${imgPath}/${fileName}@2x.png?v=${spriteHash}`
            }))
            .on('error', reject);

        spriteData.css
            .pipe($.debug({ title: `gulp-sprite-less [${dirFolder}] ~~~~` }))
            .pipe(gulp.dest(dest))
            .on('error', reject)
            .on('end', () => {
                spriteData.img
                    .pipe(buffer())
                    .on('error', reject)
                    // .pipe(compressImage(false))
                    .on('error', reject)
                    .pipe($.debug({ title: `gulp-sprite-images [${dirFolder}] ~~~~` }))
                    .pipe(gulp.dest(dest))
                    .on("end", () => {
                        resolve();
                    })
            });



    })
}



// 将指定目录下加的所有雪碧图目录单独打包构建输出
let spriteTask = function (pathConfig, folder) {
    let sprites_folder = [];
    let sprite_path = pathConfig.sprite;

    // 生产模式读取目录下的所有雪碧图跟目录
    if (configProcess.IS_PROD) {
        sprites_folder = readSpritesFolder(sprite_path.dir);
    } else { // 单独编译模式接受传递的folder 参数
        sprites_folder.push(folder);
    }

    
    let sprite_all_promise = [];
    sprites_folder.forEach(folder => {
        let s_path = {
            dir: sprite_path.dir,
            source: sprite_path.source(folder),
            output: sprite_path.output(folder),
            folder: sprite_path.folder,
            dirFolder: folder,
            fileName: sprite_path.fileName,
            imgPath: sprite_path.imgPath(folder)
        }
        sprite_all_promise.push(task.bind(null, s_path));
    });


    return new Promise((resolve, reject) => {

        // 异步队列递归调用
        (function spriteQueue(sq) {
            if (sq.length == 0) {
                return resolve(pathConfig);
            }
            let callback = sq.shift();
            callback().then(() => {
                spriteQueue(sq);
            }).catch(reject);
        })(sprite_all_promise);
    });
};

module.exports = spriteTask;