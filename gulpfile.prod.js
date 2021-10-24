// gulp
const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const ts = require('gulp-typescript');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');



// dev tasks
function compileScss () {
  return gulp.src('./src/**/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist'))
}

function compileTs () {
  return gulp.src('./src/assets/ts/main.ts')
    .pipe(ts({outFile: 'main.js'}))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/assets/js/'))
}



// exports
module.exports.functions = { compileScss, compileTs }