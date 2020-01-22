const gulp = require('gulp');

const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

const clean = require('gulp-clean');
const mustache = require('gulp-mustache');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

const webpack = require('webpack-stream');
const webpackDev = require('./webpack.dev');
const webpackProd = require('./webpack.prod');

const moveFileTypes = 'png,jpg,gif,svg,php,pdf';



//
// shared functions
//
function compileTemplates () {
  return gulp.src('./src/**/*.html')
    .pipe(mustache())
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
}

function moveFiles () {
  return gulp.src('./src/**/*.{' + moveFileTypes + '}')
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
}

function deleteDist () {
  return gulp.src('./dist', {read: false, allowEmpty: true}).pipe(clean());
}



//
// dev functions
//
function devScss () {
  return gulp.src('./src/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    // .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
}

function devWebpack () {
  return webpack(webpackDev)
    .pipe(gulp.dest('./dist/assets/js'))
    .pipe(browserSync.stream());
}



//
// prod functions
//
function prodScss () {
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist'))
}

function prodWebpack () {
  return webpack(webpackProd)
    .pipe(gulp.dest('./dist/assets/js'));
}




// browsersync
function bsServe () {
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
  gulp.watch('./src/**/*.scss', devScss);
  gulp.watch('./src/**/*.js', devWebpack);
  gulp.watch('./src/**/*.json', devWebpack);
}



// register tasks
exports.start     = gulp.series(deleteDist, gulp.parallel(compileTemplates, devScss, devWebpack, moveFiles), bsServe);
exports.compile   = gulp.series(deleteDist, gulp.parallel(compileTemplates, devScss, devWebpack, moveFiles));

exports.prod      = gulp.series(deleteDist, gulp.parallel(compileTemplates, prodScss, prodWebpack, moveFiles));