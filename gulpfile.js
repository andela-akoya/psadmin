"use strict"

var gulp = require('gulp');
var connect = require('gulp-connect'); // runs local development server
var open = require('gulp-open'); // Open a URL in a web browser
var browserify = require('browserify'); // Bundles Js
var reactify = require('reactify'); // Transforms React JSX to JS
var source = require('vinyl-source-stream'); // Use conventional text streams with gulp
var concat = require('gulp-concat'); // Use to concatenate files
var lint = require('gulp-eslint'); // Lint our javascript files including JSX

var  config = {
  port: 9000,
  devBaseUrl: 'http://localhost',
  paths: {
    html: './src/*.html',
    css: 'node_modules/materialize-css/dist/css/materialize.min.css',
    js: './src/**/*.js',
    dist: './dist',
    mainJs: './src/main.js'
  }
}

// Start a local development server
gulp.task('connect', function () {
  connect.server({
    root: ['dist'],
    base: config.devBaseUrl,
    port: config.port,
    livereload: true
  });
});

gulp.task('open', ['connect'], function () {
  gulp.src('dist/index.html')
    .pipe(open({uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html', function () {
  gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(connect.reload());
});

gulp.task('css', function () {
  gulp.src(config.paths.css)
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('js', function() {
  browserify(config.paths.mainJs)
    .transform(reactify)
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(config.paths.dist + '/scripts'))
    .pipe(connect.reload());
});

gulp.task('lint', function () {
  return gulp.src(config.paths.js)
    .pipe(lint({configFile: 'eslint.config.json'}))
    .pipe(lint.format());
});

gulp.task('watch', function () {
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.js, ['js', 'lint']);
});

gulp.task('default', ['html', 'js', 'css', 'lint', 'open', 'watch']);
