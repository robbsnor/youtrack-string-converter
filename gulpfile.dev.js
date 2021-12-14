// gulp
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').get('bsServer');

// webpack
const webpack = require('webpack-stream');
const webpackDev = require('./webpack.dev');



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

function compileWebpack() {
  return webpack(webpackDev)
    .pipe(gulp.dest('./dist/assets/js'))
    .pipe(browserSync.stream());
}



// exports
module.exports.functions = { compileScss, compileWebpack }