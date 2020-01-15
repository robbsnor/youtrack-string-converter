const gulp = require('gulp');
const webpack_stream = require("webpack-stream");
const webpack_config = require("./webpack.prod");



// functions
function webpackProd() {
  return webpack_stream(webpack_config)
    .pipe(gulp.dest("./dist/"));
}



// exports
exports.prod = webpackProd;
