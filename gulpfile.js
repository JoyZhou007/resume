var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');

// Static Server + watching scss/html files
gulp.task('bi-page-serve', ['bi-page-sass'], function() {

  browserSync.init({
    server: "./",
    port: 3002
  });

  gulp.watch("./scss/**/*.scss", ['bi-page-sass']);
  gulp.watch("./**/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers

gulp.task('bi-page-sass', function() {
  return gulp.src("./scss/**/*.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(gulp.dest("./css"))
    .pipe(browserSync.stream());
});


gulp.task('default', ['bi-page-serve']);