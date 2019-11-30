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
  return gulp.src(['./src/**/*.scss', '!./src/**/debug.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(rename({dirname: '/'}))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
}

function debug() {
  return gulp.src('./src/**/debug.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('all.css'))
    .pipe(gulp.dest('./dist'))
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
  gulp.watch('./src/**/*.scss', gulp.series(compileScss, debug));
  gulp.watch('./src/**/*.js', compileJs);
  gulp.watch('./src/**/*.{png,jpg,gif,svg}', compileImg);
};



// gulp functions and exports
const compilers = gulp.parallel(compileHtml, compileScss, compileJs, compileImg);
const compilersDev = gulp.series(compilers, debug);

exports.compile = gulp.series(compilers);
exports.compileDev = compilersDev;
exports.default = gulp.series(compilersDev, serve);