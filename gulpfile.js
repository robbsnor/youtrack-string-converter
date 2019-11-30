const gulp = require('gulp');
const clean = require('gulp-clean');

const prod = require('./gulpfile.prod.js');
const dev = require('./gulpfile.dev.js');



// delete build
function deleteDist() {
  return gulp.src('./dist', {read: false,allowEmpty: true})
    .pipe(clean());
}



// gulp functions and exports
exports.prod      = gulp.parallel(dev.compilersForProd, prod.compilersForProd);
exports.compile   = dev.compilersForDevCompile;
exports.start     = dev.compilersForDevServe;