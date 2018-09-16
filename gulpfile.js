//导入模块
let gulp = require("gulp");
let minifyJS = require("gulp-babel-minify");
let minifyCSS = require("gulp-clean-css");
let connect = require("gulp-connect");
let minifyImg = require("gulp-imagemin");
let sass = require("gulp-sass");
let webserver = require("gulp-webserver");


//build 把一些指定文件复制到dist文件夹中
gulp.task("build",()=>{
    gulp.src("./src/**/*.js")
    .pipe(minifyJS())
    .pipe(gulp.dest("./dist"))

    gulp.src("./src/**/*.html")
    .pipe(gulp.dest("./dist"))

    gulp.src("./src/**/*.scss")
    .pipe(sass({
        outputStyle:"expanded"
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest("./dist"))

    gulp.src("./src/img/*")
    .pipe(minifyImg())
    .pipe(gulp.dest("./dist/img"))  //创建一个img文件 放加入的图片
})

gulp.task("refreshHTML",()=>{
    gulp.src("./src/**/*.html")
    .pipe(gulp.dest("./dist"))
    .pipe(connect.reload())
})
gulp.task("refreshJS",()=>{
    gulp.src("./src/**/*.js")
    .pipe(minifyJS())
    .pipe(gulp.dest("./dist"))
})
gulp.task("refreshCSS",()=>{
    gulp.src("./src/**/*.scss")
    .pipe(sass({
        outputStyle:"expanded"
    })).on('error',sass.logError)  //捕获错误
    //.pipe(minifyCSS())
    .pipe(gulp.dest("./dist"))
})
gulp.task("refreshImg",()=>{
    gulp.src("./src/img/*")
    .pipe(minifyImg())
    .pipe(gulp.dest("./dist/img"))
})

// gulp.task("server",()=>{
//     connect.server({
//         port : 8181,
//         root : "dist",
//         livereload : true
//     })

//     //监听
//     gulp.watch("./src/**/*.html",["refreshHTML"]);
//     gulp.watch("./src/**/*.js",["refreshJS","refreshHTML"]);
//     gulp.watch("./src/**/*.scss",["refreshCSS","refreshHTML"]);
//     gulp.watch("./src/img/*",["refreshImg","refreshHTML"]);
// })

gulp.task("webserver",()=>{
    gulp.src("dist")
        .pipe(webserver({
            livereload:true,
            root :"dist",
            directoryListing:true,  //监听文件的增减
            port:8181
        }))
 
    //监听文件的变化 执行相对应的文件
    gulp.watch("./src/**/*.html",["refreshHTML"]);
    gulp.watch("./src/**/*.js",["refreshJS","refreshHTML"]);
    gulp.watch("./src/**/*.scss",["refreshCSS","refreshHTML"]);
    gulp.watch("./src/img/*",["refreshImg","refreshHTML"]);
})

gulp.task("proxyserver",()=>{
    connect.server({
        root:"dist",
        port:9000,
        livereload:true,
        middleware:function(connect,opt){
            var Proxy = require('gulp-connect-proxy');
            opt.route = '/proxy';
            var proxy = new Proxy(opt);
            return [proxy];
        }
    });
    gulp.watch("./src/**/*.html",["refreshHTML"]);
    gulp.watch("./src/**/*.js",["refreshJS","refreshHTML"]);
    gulp.watch("./src/**/*.scss",["refreshCSS","refreshHTML"]);
    gulp.watch("./src/img/*",["refreshImg","refreshHTML"]);
})