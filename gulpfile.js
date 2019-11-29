const gulp = require('gulp');
const prod = require('./gulpfile.prod.js');
const dev = require('./gulpfile.dev.js');

exports.prod = gulp.series(dev.compile, prod.compile);;
exports.compile = dev.compile;
exports.dev = gulp.series(dev.default);