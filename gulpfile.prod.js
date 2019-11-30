const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');



// compilers
function compileScss() {
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
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
exports.compilersForProd = gulp.parallel(compileScss, compileJs);
