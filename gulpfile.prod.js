const gulp = require('gulp');
const clean = require('gulp-clean');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');


// compilers

function compileScss() {
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({dirname: '/'}))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist'))
}

function compileJs() {
  return gulp.src('./src/**/*.js')
    .pipe(rename({dirname: '/'}))
    .pipe(gulp.dest('./dist'))
}



// delete dist
function deleteDist() {
  return gulp.src('./dist', {
      read: false,
      allowEmpty: true
    })
    .pipe(clean());
}



// gulp
const compilers = gulp.parallel(compileScss, compileJs);

exports.compile = compilers;