// gulp
const gulp = require('gulp');
const clean = require('gulp-clean');
const mustache = require('gulp-mustache');
const browserSync = require('browser-sync').create('bsServer');

// vars
const dev = require('./gulpfile.dev').functions;
const prod = require('./gulpfile.prod').functions;

const justMoveFileTypes = 'jpg,png,gif,svg,php,pdf,ico,mp3';

const nodeFiles = [
  {
    src: './node_modules/photoswipe/src/css/default-skin/default-skin.png',
    dest: './dist/assets/img/photoswipe'
  }
]



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

function getNodeModuleAssets(cb) {
  for (let i = 0; i < nodeFiles.length; i++) {
    const file = nodeFiles[i];
    const src = file.src;
    const dest = file.dest;
    
    gulp
     .src(src)
     .pipe(gulp.dest(dest))
  }
  cb();
}

function deleteDist() {
  return gulp.src('./dist', { read: false, allowEmpty: true }).pipe(clean());
}

// browsersync
function bsServe() {
  browserSync.init({
    server: {
      baseDir: './dist',
      index: '/index.html',
    },
    open: 'external',
    // open: false,
    notify: false,
    ghostMode: false,
  });

  gulp.watch('./src/**/*.{' + justMoveFileTypes + '}', moveFiles);
  gulp.watch('./src/**/*.mustache', compileTemplates);
  gulp.watch('./src/**/*.html', compileTemplates);
  gulp.watch('./src/**/*.scss', dev.compileScss);
  gulp.watch('./src/**/*.js', dev.compileWebpack);
  gulp.watch('./src/**/*.json', dev.compileWebpack);
}



// register tasks
const devCompile = gulp.series(deleteDist, gulp.parallel(compileTemplates, dev.compileScss, dev.compileWebpack, getNodeModuleAssets, moveFiles,));

exports.compile   = devCompile;
exports.start     = gulp.series(devCompile, bsServe);
exports.prod      = gulp.series(deleteDist, gulp.parallel(compileTemplates, prod.compileScss, prod.compileWebpack, getNodeModuleAssets, moveFiles));
