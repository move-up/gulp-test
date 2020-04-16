// const { src, dest, task, watch, series, parallel } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const browserSync = require('browser-sync');

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
});

// CopyHtml
gulp.task('CopyHtml', function(){
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./dist'))
});

gulp.task('watch', function() {
  
  gulp.watch('./src/sass/**/*.scss', ['Sass']);
  // gulp.watch('./src/sass/**/*.scss', gulp.series('Sass'));
  // gulp.watch('./src/**/*.html', gulp.series('CopyHtml'));
})

// task('gulp', series('doSomething'));