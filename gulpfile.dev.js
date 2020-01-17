const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const mustache = require('gulp-mustache');

const webpack_stream = require("webpack-stream");
const webpack_config = require("./webpack.dev");



// functions
function compileTemplates() {
  return gulp
    .src("./src/**/*.html")
    .pipe(mustache())
    .pipe(rename({dirname: "/"}))
    .pipe(gulp.dest("./dist/"))
    .pipe(browserSync.stream());
}

function compileScss() {
  return gulp.src('./src/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    // .pipe(autoprefixer())
    .pipe(rename({dirname: '/'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
}

function compileImg() {
  return gulp
    .src("./src/**/*.{png,jpg,gif,svg}")
    .pipe(rename({dirname: "/"}))
    .pipe(gulp.dest("./dist/"))
    .pipe(browserSync.stream());
}

function webpackDev() {
  return webpack_stream(webpack_config)
    .pipe(gulp.dest("./dist/"))
    .pipe(browserSync.stream());
}



// browsersync
function bsServe() {
  browserSync.init({
    server: {
      baseDir: "./dist",
      index: "/index.html"
    },
    open: "external",
    notify: false,
    ghostMode: false
  });

  gulp.watch("./src/**/*.{png, jpg, gif, svg}", compileImg);
  gulp.watch("./src/**/*.mustache", compileTemplates);
  gulp.watch("./src/**/*.html", compileTemplates);
  gulp.watch("./src/**/*.scss", compileScss);
  gulp.watch("./src/**/*.js", webpackDev);
}



// exports

// dev
var devFunctions = gulp.parallel(compileTemplates, compileScss, compileImg, webpackDev);
exports.devCompile = devFunctions;
exports.dev = gulp.series(devFunctions, bsServe);

// production
exports.prod = gulp.parallel(compileTemplates, compileTemplates, compileImg);