const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');



// compilers
function compileScss() {
  return gulp.src(['./src/**/*.scss', '!./src/**/debug.scss'])
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



// gulp functions and exports
const compilers = gulp.parallel(compileScss, compileJs);

exports.compile = compilers;