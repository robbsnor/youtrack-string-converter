// gulp
const gulp = require('gulp');
const sass = require('gulp-sass');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').get('bsServer');



// dev tasks
function compileScss() {
  return gulp.src('./src/**/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    // .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
}

function compileTs() {
  return gulp.src('./src/assets/ts/main.ts')
    .pipe(ts({outFile: 'main.js'}))
    .pipe(gulp.dest('./dist/assets/js/'))
    .pipe(browserSync.stream());
}



// exports
module.exports.functions = { compileScss, compileTs }