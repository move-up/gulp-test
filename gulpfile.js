// const { src, dest, task, watch, series, parallel } = require('gulp');
const gulp = require('gulp');
// 编译sass
const sass = require('gulp-sass');
// 删除文件
const del = require('del');
const browserSync = require('browser-sync');
// js压缩
const uglify = require('gulp-uglify');
// 压缩图片
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant'); //png图片压缩插件
// 自动刷新
const livereload = require('gulp-livereload');

const connect = require('gulp-connect');

// 清除文件
gulp.task('Clean', function () {
  del('./dist');
});

// 修改后自动刷新页面
gulp.task('BrowserSync', function(){
  browserSync({
    server: {
      baseDir: 'src' // 根目录
    }
  })
});

// 预编译sass
// gulp.task('Sass', function(){
//   return gulp.src('./src/sass/**/*.scss')
//     .pipe(sass())
//     .pipe(gulp.dest('./dist/css'))
// });
gulp.task('Sass', function() {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(livereload());
});

// CopyHtml
gulp.task('CopyHtml', function(){
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./dist'))
    .pipe(livereload());
});

// JS
gulp.task('MinifyJs', function () {
  gulp.src('./src/js/*.js') // 要压缩的js文件
  .pipe(uglify())  //使用uglify进行压缩,更多配置请参考：
  .pipe(gulp.dest('./dist/js'))  //压缩后的路径
  .pipe(livereload()); 
});

// img
gulp.task('MinifyImg', function () {
  return gulp.src('./src/img/*')
      .pipe(imagemin({
          progressive: true,
          use: [pngquant()] //使用pngquant来压缩png图片
      }))
      .pipe(gulp.dest('./dist/img'))
      .pipe(livereload());
});

//定义livereload任务
gulp.task('connect', function () {
  connect.server({
      livereload: true
   });
});


gulp.task('watch', function() {

  livereload.listen(); //要在这里调用listen()方法

  // 启动Browsersync服务
  browserSync.init({      
    server: {
        baseDir: './dist',   // 启动服务的目录 默认 index.html    
        index: 'index.html' // 自定义启动文件名
    },
    // 决定Browsersync启动时自动打开的网址 external 表示 可外部打开 url, 可以在同一 wifi 下不同终端测试
    open: 'external', 
    // 注入CSS改变  
    injectChanges: true 
  });
  
  gulp.watch('./src/sass/**/*.scss', gulp.series('Sass'));
  gulp.watch('./src/js/*.js', gulp.series('MinifyJs'));
  gulp.watch('./src/img/*', gulp.series('MinifyImg'));
  gulp.watch('./src/**/*.html', gulp.series('CopyHtml'));
})
