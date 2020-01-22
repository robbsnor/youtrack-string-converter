const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.dev');



// functions
module.exports.scss = function () {
  console.log('scss');
  return gulp.src('./src/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    // .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
}

module.exports.webpack = function () {
  console.log('webpack');
  return webpack(webpackConfig)
    .pipe(gulp.dest('./dist/js/'))
    .pipe(browserSync.stream());
}

