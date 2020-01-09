const gulp = require("gulp");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");

// compilers
function compileScss() {
  return gulp
    .src("./src/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(rename({ dirname: "/" }))
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("./dist"));
}

// gulp functions and exports
exports.compilersForProd = gulp.parallel(compileScss);
