const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');


// compilers
function compileHtml() {
  return gulp.src('./src/**/*.html')
    .pipe(rename({dirname: '/'}))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
}

function compileScss() {
  return gulp.src('./src/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
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
    }
  });
  gulp.watch('./src/**/*.html', compileHtml);
  gulp.watch('./src/**/*.scss', compileScss);
  gulp.watch('./src/**/*.js', compileJs);
  gulp.watch('./src/**/*.{png,jpg,gif,svg}', compileImg);
};



// gulp functions and exports
const compilers = gulp.parallel(compileHtml, compileScss, compileJs, compileImg);

exports.compile = gulp.series(compilers);
exports.default = gulp.series(compilers, serve);