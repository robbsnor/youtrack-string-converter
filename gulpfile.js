const gulp = require('gulp');
const clean = require('gulp-clean');
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();
const mustache = require("gulp-mustache");
const webpack_stream = require("webpack-stream");
const webpack_config = require("./webpack.dev");



// functions
function compileTemplates() {
  return gulp
    .src("./src/templates/**/*.html")
    .pipe(mustache())
    .pipe(rename({ dirname: "/" }))
    .pipe(gulp.dest("./dist/"))
    .pipe(browserSync.stream());
}

function webpack() {
  return webpack_stream(webpack_config)
    .pipe(gulp.dest("./dist/"))
    .pipe(browserSync.stream());
}

function compileImg() {
  return gulp
    .src("./src/**/*.{png,jpg,gif,svg}")
    .pipe(rename({ dirname: "/" }))
    .pipe(gulp.dest("./dist/"))
    .pipe(browserSync.stream());
}



// browsersync
function bsServe() {
  watch();

  browserSync.init({
    server: {
      baseDir: "./dist",
      index: "/index.html"
    },
    open: "external",
    notify: false,
    ghostMode: false
  });

}

// watch
function watch() {
  gulp.watch("./src/**/*.mustache", compileTemplates);
  gulp.watch("./src/**/*.html", compileTemplates);
  gulp.watch("./src/**/*.scss", webpack);
  gulp.watch("./src/**/*.js", webpack);
  gulp.watch("./src/**/*.{png,jpg,gif,svg}", compileImg);
}

// delete folder
function deleteFolder(path) {
  return gulp.src(path, {read: false, allowEmpty: true}).pipe(clean());
}

function deleteDist(){
  return deleteFolder('./dist');
}


// gulp functions and exports
exports.default = gulp.series(deleteDist, compileTemplates, webpack, compileImg, bsServe);