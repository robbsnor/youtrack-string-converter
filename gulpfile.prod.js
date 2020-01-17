const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

const webpack = require("webpack-stream");
const webpackConfig = require("./webpack.prod");



// functions
function compileScss() {
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist'))
}

function webpackProd() {
  return webpack(webpackConfig)
    .pipe(gulp.dest("./dist/js/"));
}



// exports
exports.prod = gulp.parallel(compileScss, webpackProd);
