const gulp = require('gulp');
const clean = require('gulp-clean');
const mustache = require('gulp-mustache');
const browserSync = require('browser-sync').create();

const dev = require('./gulpfile.dev.js');
const prod = require('./gulpfile.prod.js');

const moveFileTypes = 'png,jpg,gif,svg,php,pdf';



// shared functions
function compileTemplates () {
  return gulp.src('./src/**/*.html')
    .pipe(mustache())
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
}

function moveFiles () {
  return gulp.src('./src/**/*.{' + moveFileTypes + '}')
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
}

function deleteDist () {
  return gulp.src('./dist', {read: false, allowEmpty: true}).pipe(clean());
}



// browsersync
function bsServe () {
  browserSync.init({
    server: {
      baseDir: './dist',
      index: '/index.html'
    },
    open: 'external',
    notify: false,
    ghostMode: false
  });

  gulp.watch('./src/**/*.{' + moveFileTypes + '}', moveFiles);
  gulp.watch('./src/**/*.mustache', compileTemplates);
  gulp.watch('./src/**/*.html', compileTemplates);
  gulp.watch('./src/**/*.scss', dev.compileScss);
  gulp.watch('./src/**/*.js', dev.webpack);
  gulp.watch('./src/**/*.json', dev.webpack);
}



// register tasks
exports.start     = gulp.series(deleteDist, gulp.parallel(compileTemplates, dev.scss, dev.webpack), bsServe);
exports.compile   = gulp.series(deleteDist, gulp.parallel(compileTemplates, dev.scss, dev.webpack));

exports.prod      = gulp.series(deleteDist, compileTemplates, prod.scss, prod.webpack);