// gulp
const gulp = require('gulp');
const clean = require('gulp-clean');
const mustache = require('gulp-mustache');
const browserSync = require('browser-sync').create('bsServer');

// vars
const dev = require('./gulpfile.dev').functions;
const prod = require('./gulpfile.prod').functions;

const justMoveFileTypes = 'png,jpg,gif,svg,php,pdf';

// shared tasks
function compileTemplates() {
  return gulp
    .src('./src/**/*.html')
    .pipe(mustache())
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
}

function moveFiles() {
  return gulp
    .src('./src/**/*.{' + justMoveFileTypes + '}')
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
}

function deleteDist() {
  return gulp.src('./dist', {read: false, allowEmpty: true}).pipe(clean());
}

// browsersync
function bsServe() {
  browserSync.init({
    server: {
      baseDir: './dist',
      index: '/index.html',
    },
    open: 'external',
    notify: false,
    ghostMode: false,
  });

  gulp.watch('./src/**/*.{' + justMoveFileTypes + '}', moveFiles);
  gulp.watch('./src/**/*.mustache', compileTemplates);
  gulp.watch('./src/**/*.html', compileTemplates);
  gulp.watch('./src/**/*.scss', dev.compileScss);
  gulp.watch('./src/**/*.js', dev.compileWebpack);
  gulp.watch('./src/**/*.vue', dev.compileWebpack);
  gulp.watch('./src/**/*.json', dev.compileWebpack);
}

// register tasks
exports.start = gulp.series(
  deleteDist,
  gulp.parallel(
    compileTemplates,
    dev.compileScss,
    dev.compileWebpack,
    moveFiles
  ),
  bsServe
);
exports.compile = gulp.series(
  deleteDist,
  gulp.parallel(
    compileTemplates,
    dev.compileScss,
    dev.compileWebpack,
    moveFiles
  )
);

exports.prod = gulp.series(
  deleteDist,
  gulp.parallel(
    compileTemplates,
    prod.compileScss,
    prod.compileWebpack,
    moveFiles
  )
);
