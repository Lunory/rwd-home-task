'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var del = require('del');
var server = require('browser-sync').create();
var run = require('run-sequence');

//Minification
var cssNano = require('gulp-cssnano');
var jsMin = require('gulp-jsmin');
var imagemin = require('gulp-imagemin');

//Rename
var rename = require('gulp-rename');

//PostCSS plugins
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var nested = require('postcss-nested');
var atImport = require('postcss-import');
var mqpacker = require('css-mqpacker');
var customMedia = require('postcss-custom-media');
var cssVariables = require('postcss-css-variables');
var objectFitImages = require('postcss-object-fit-images');

//Style
gulp.task('style', function() {
  return gulp.src('src/postcss/style.css')
    .pipe(plumber())
    .pipe(postcss([
      atImport(),
      nested(),
      customMedia(),
      cssVariables(),
      objectFitImages(),
      autoprefixer({browsers: [
        'last 2 versions'
      ]}),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(cssNano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/css'));
});

//JS
gulp.task('js', function() {
  return gulp.src('build/js/*.js')
    .pipe(jsMin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/js'));
});

//Image
gulp.task('images', function() {
  return gulp.src('build/img/*.{png,jpg,gif}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest('build/img'));
});

//Clean
gulp.task('clean', function() {
  return del('build');
});

//Copy
gulp.task('copy', function() {
  return gulp.src([
    'src/fonts/**/*.{woff,woff2}',
    'src/img/**',
    'src/js/**',
    'src/*.html'
  ], {
    base: './src'
  })
    .pipe(gulp.dest('build'));
});

//Server
gulp.task('html:copy', function() {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('build'));
});

gulp.task('html:update', ['html:copy'], function(done) {
  server.reload();
  done();
});

gulp.task('js:copy', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('build/js'));
});

gulp.task('js:update', ['js:copy'], function(done) {
  server.reload();
  done();
});

gulp.task('serve', function() {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('src/postcss/**/*.css', ['style']);
  gulp.watch('src/js/**/*.js', ['js:update']);
  gulp.watch('src/*.html', ['html:update']);
});

//Run
gulp.task('build', function(done) {
  run('clean', 'copy', 'style', 'js', 'images', done)
});
