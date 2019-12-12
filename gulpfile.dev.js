const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const mustache = require('gulp-mustache');



// compilers
function compileTemplates() {
  return gulp.src('./src/templates/**/*.html')
    .pipe(mustache({ msg: "Hello Gulp!"}))
    .pipe(rename({dirname: '/'}))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
}

function compileScss() {
  return gulp.src('./src/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    // .pipe(autoprefixer())
    .pipe(rename({dirname: '/'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
}

function compileJs() {
  return gulp.src('./src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(rename({dirname: '/'}))
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write())
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
    },
    open: "external",
    notify: false,
    ghostMode: false,
  });

  gulp.watch('./src/**/*.mustache', compileTemplates);
  gulp.watch('./src/**/*.html', compileTemplates);
  gulp.watch('./src/**/*.scss', compileScss);
  gulp.watch('./src/**/*.js', compileJs);
  gulp.watch('./src/**/*.{png,jpg,gif,svg}', compileImg);
};



// gulp functions and exports
// v - shared functions between 'Dev compile' and 'Dev serve'
const compilersForDev = gulp.parallel(compileTemplates, compileScss, compileJs, compileImg);

exports.compilersForProd        = gulp.parallel(compileTemplates, compileImg);
exports.compilersForDevCompile  = compilersForDev
exports.compilersForDevServe    = gulp.series(compilersForDev, bsServe);