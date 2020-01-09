const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();
const mustache = require("gulp-mustache");
const webpack_stream = require("webpack-stream");
const webpack_config = require("./webpack.dev");

// compilers
function compileTemplates() {
  return gulp
    .src("./src/templates/**/*.html")
    .pipe(mustache())
    .pipe(rename({ dirname: "/" }))
    .pipe(gulp.dest("./dist/"))
    .pipe(browserSync.stream());
}

function compileScss() {
  return gulp
    .src("./src/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(rename({ dirname: "/" }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./dist"))
    .pipe(browserSync.stream());
}

function compileJs() {
  return webpack_stream(webpack_config).pipe(gulp.dest("./dist/"));
}

function compileImg() {
  return gulp
    .src("./src/**/*.{png,jpg,gif,svg}")
    .pipe(rename({ dirname: "/" }))
    .pipe(gulp.dest("./dist/"))
    .pipe(browserSync.stream());
}

// browser-sync
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

  gulp.watch("./src/**/*.mustache", compileTemplates);
  gulp.watch("./src/**/*.html", compileTemplates);
  gulp.watch("./src/**/*.scss", compileScss);
  gulp.watch("./src/**/*.js", compileJs);
  gulp.watch("./src/**/*.{png,jpg,gif,svg}", compileImg);
}

// gulp functions and exports
// v - shared functions between 'Dev compile' and 'Dev serve'
const compilersForDev = gulp.parallel(
  compileTemplates,
  compileScss,
  compileJs,
  compileImg
);

exports.compilersForProd = gulp.parallel(compileTemplates, compileImg);
exports.compilersForDevCompile = compilersForDev;
exports.compilersForDevServe = gulp.series(compilersForDev, bsServe);
