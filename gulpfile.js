const gulp = require('gulp');
const clean = require('gulp-clean');

const dev = require("./gulpfile.dev.js");
const prod = require("./gulpfile.prod.js");



// functions
function deleteDist() {
  return gulp.src('./dist', {read: false, allowEmpty: true}).pipe(clean());
}



// exports

// dev
exports.dev = gulp.series(deleteDist, dev.dev)
exports.compile = gulp.series(deleteDist, dev.devCompile);

// production
exports.prod = gulp.series(deleteDist, gulp.series(dev.prod, prod.prod));