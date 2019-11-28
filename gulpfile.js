const gulp = require('gulp');
const clean = require('gulp-clean');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();


// compilers
function compileHtml() {
  return gulp.src('./src/**/*.html')
    .pipe(rename({dirname: '/'}))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
}

function compileScss() {
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(rename({dirname: '/'}))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
}

function compileJs() {
  return gulp.src('./src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(rename({dirname: '/'}))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
}

function compileImg() {
  return gulp.src('./src/**/*.{png,jpg,gif,svg}')
    .pipe(rename({dirname: '/'}))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
}



// browser-sync
function serve() {
  browserSync.init({
    server: {
      baseDir: "./dist",
      index: "/index.html",
      open: "external",
      notify: false
    }
  });
  gulp.watch('./src/**/*.html', compileHtml);
  gulp.watch('./src/**/*.scss', compileScss);
  gulp.watch('./src/**/*.js', compileJs);
  gulp.watch('./src/**/*.{png,jpg,gif,svg}', compileImg);
};



// delete dist
function deleteDist() {
  return gulp.src('./dist', {read: false, allowEmpty: true})
    .pipe(clean());
}



// gulp
const compilers = gulp.parallel(compileHtml, compileScss, compileJs, compileImg);

exports.compile = gulp.series(deleteDist, compilers);
exports.default = gulp.series(deleteDist, compilers, serve);