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
  return gulp.src(['./src/**/*.scss', '!./src/**/dev.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({dirname: '/'}))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
}

function compileScssDev() {
  return gulp.src('./src/**/dev.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    // overwrites all.scss from compileScss()
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
function bsServe() {
  browserSync.init({
    server: {
      baseDir: "./dist",
      index: "/index.html",
    }
  });
  gulp.watch('./src/**/*.html', compileHtml);
  gulp.watch('./src/**/*.scss', gulp.series(compileScss, compileScssDev));
  gulp.watch('./src/**/*.js', compileJs);
  gulp.watch('./src/**/*.{png,jpg,gif,svg}', compileImg);
};



// gulp functions and exports
exports.compilersForProd        = gulp.parallel(compileHtml, compileJs, compileImg);
exports.compilersForDevCompile  = gulp.series(gulp.parallel(compileHtml, compileScss, compileJs, compileImg), compileScssDev);
exports.compilersForDevServe  = gulp.series(gulp.parallel(compileHtml, compileScss, compileJs, compileImg), compileScssDev, bsServe);