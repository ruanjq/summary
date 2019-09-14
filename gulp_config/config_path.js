/**
 * @author ruanjq
 * @description gulp 打包编译基础配置，配置相关代码文件路径
 */

let path = require("path");


/**
 * source 开发源文件路径配置
 * output 编译打包输出路径
 * special 目录配置成一个独立的文件夹
 */

const SKIN_ARR = ['skin2'];
let skin2_dir = path.resolve(__dirname, "../", SKIN_ARR[0]);
let config_path = {
    skin2: { // skin2 项目基础文件路径文件配置
        script: {
            source: [
                path.resolve(skin2_dir, 'dist/js/**/*.js')
            ],
            output: path.resolve(skin2_dir, 'dist/minjs'),
        },
        less: {
            source: [path.resolve(skin2_dir, 'dist/less/*.less')],
            output: path.resolve(skin2_dir, 'dist/mincss'),
        },
        template: {
            source: [path.resolve(skin2_dir, 'template/**/*.+(htm|html)'), '!' + path.resolve(skin2_dir, 'template/special/**/*.+(htm|html)')],   // 过滤专题模板文件，专题模板单独打包编译
            output: path.resolve(skin2_dir, 'template_out')
        },
        sprite: {
            dir: path.resolve(skin2_dir, "dist/images/sprites"),
            source: function (folder) {
                return path.join(this.dir, `${folder}/sprite/*.+(png|jpg)`)
            },
            output: function (folder) {
                return path.resolve(this.dir, folder)
            },
            imgPath: function (folder) {
                return `../images/sprites/${folder}`;
            },
            folder: "/sprite",
            fileName: "sprite"
        },
        rev_manifest: {
            output: path.resolve("./"),
            fileName: `rev-manifest-${SKIN_ARR[0]}.json`
        }
    },
    skin2_special:{  // skin2 项目 special 文件路径文件配置
        script: {
            source: [path.resolve(skin2_dir, 'dist/special/**/*.js'),"!" + path.resolve(skin2_dir, 'dist/special/**/*min.js')],
            output: path.resolve(skin2_dir, 'dist/special')
        },
        less: {
            source: [path.resolve(skin2_dir, 'dist/special/**/*.less'), '!' + path.resolve(skin2_dir, 'dist/special/**/icon/**/*.less')],
            output: path.resolve(skin2_dir, 'dist/special')
        },
        template: {
            source: [path.resolve(skin2_dir, 'template/special/**/*.+(htm|html)')],   // 过滤专题模板文件，专题模板单独打包编译
            output: path.resolve(skin2_dir, 'template_out/special')
        },
        sprite: {
            dir: path.resolve(skin2_dir, "dist/special"),
            source: function (folder) {
                return path.join(this.dir, `${folder}/icon/sprite/*.+(png|jpg)`)
            },
            output: function (folder) {
                return path.resolve(this.dir, `${folder}/icon`)
            },
            folder: "/sprite",
            fileName: "sprite",
            imgPath: function () {
                return `../icon`;
            }
        },
        rev_manifest: {
            output: path.resolve("./"),
            fileName: `rev-manifest-${SKIN_ARR[0]}.json`
        }
    }    
}

module.exports = config_path;







