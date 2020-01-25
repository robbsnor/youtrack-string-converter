// gulp
const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

// webpack
const webpack = require('webpack-stream');
const webpackProd = require('./webpack.prod');



// dev tasks
function compileScss () {
  return gulp.src('./src/**/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist'))
}

function compileWebpack () {
  return webpack(webpackProd)
    .pipe(gulp.dest('./dist/assets/js'));
}



// exports
module.exports.functions = { compileScss, compileWebpack }