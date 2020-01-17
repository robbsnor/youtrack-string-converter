const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

const webpack_stream = require("webpack-stream");
const webpack_config = require("./webpack.prod");




// functions
function compileScss() {
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(rename({dirname: '/'}))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist'))
}

function webpackProd() {
  return webpack_stream(webpack_config)
    .pipe(gulp.dest("./dist/"));
}



// exports
exports.prod = gulp.parallel(compileScss, webpackProd);
