const gulp = require('gulp');
const prod = require('./gulpfile.prod.js');
const dev = require('./gulpfile.dev.js');

exports.prod = prod.default;
exports.compile = dev.compile;
exports.dev = dev.default;