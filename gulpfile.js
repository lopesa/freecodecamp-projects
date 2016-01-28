'use strict';

var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var open = require('gulp-open');


 
gulp.task('jade', function() {
  var YOUR_LOCALS = {};

  // console.log("i dunno");
 
  gulp.src('./app/jade/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS,
      pretty: true
    }))
    .pipe(gulp.dest('./app/'))
    .pipe(connect.reload());
});


gulp.task('sass', function () {
  gulp.src('./app/scss/**/*.scss')
    // .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true
      }))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('./app/css'))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});


gulp.task('open', function(){
  var options = {
    uri: 'http://localhost:8080',
  };
  gulp.src(__filename)
  .pipe(open(options));
});



gulp.task('watch', function () {
  gulp.watch('./app/jade/*.jade', ['jade']);
  gulp.watch('./app/scss/**/*.scss', ['sass']);
  gulp.watch('./app/js/*.js', function(event) {
    connect.reload();
  })
});


gulp.task('default', ['jade' ,'sass', 'connect', 'open', 'watch']);