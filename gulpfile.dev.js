const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const mustache = require('gulp-mustache');

const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.dev');

var moveFileTypes = 'png,jpg,gif,svg,php,pdf';



// functions
function compileTemplates() {
  return gulp.src('./src/**/*.html')
    .pipe(mustache())
    .pipe(rename({dirname: '/'}))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
}

function compileScss() {
  return gulp.src('./src/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    // .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
}

function moveFiles() {
  return gulp.src('./src/**/*.{' + moveFileTypes + '}')
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
}

function webpackDev() {
  return webpack(webpackConfig)
    .pipe(gulp.dest('./dist/js/'))
    .pipe(browserSync.stream());
}



// browsersync
function bsServe() {
  browserSync.init({
    server: {
      baseDir: './dist',
      index: '/index.html'
    },
    open: 'external',
    notify: false,
    ghostMode: false
  });

  gulp.watch('./src/**/*.{' + moveFileTypes + '}', moveFiles);
  gulp.watch('./src/**/*.mustache', compileTemplates);
  gulp.watch('./src/**/*.html', compileTemplates);
  gulp.watch('./src/**/*.scss', compileScss);
  gulp.watch('./src/**/*.js', webpackDev);
  gulp.watch('./src/**/*.json', webpackDev);
}



// exports

// dev
var devFunctions = gulp.parallel(compileTemplates, compileScss, moveFiles, webpackDev);
exports.devCompile = devFunctions;
exports.dev = gulp.series(devFunctions, bsServe);

// production
exports.prod = gulp.parallel(compileTemplates, moveFiles);