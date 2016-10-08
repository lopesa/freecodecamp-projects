'use strict';


// leveraged https://gist.github.com/ChrisLTD/7b1a3e5a4128c713b21e

var gulp =         require('gulp');
var plumber =      require('gulp-plumber');
var pug =          require('gulp-pug');
var sass =         require('gulp-sass');
var opn =          require('opn');
var gulpif =       require('gulp-if');
var util =         require('gulp-util');
var webpack =      require('gulp-webpack');
var livereload =   require('gulp-livereload');
var sourcemaps =   require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var uglify =       require('gulp-uglify');
var del =          require('del');

var data =         require('gulp-data');




var sourcePaths = {
  templates: ['./dev/pug/**/*.pug'],
  styles: ['./dev/scss/**/*.scss'],
  images: ['./dev/img/**/*'],
  js: './dev/js/**/*.js'
  // etc: ['./dev/sitemaps/*', './dev/robots.txt']
},

distPaths = {
  templates: './dist/',
  styles: './dist/css',
  images: './dist/img',
  js: './dist/js'
},

server = {
  host: '192.168.1.3',
  port: '8080'
};

// flagParser = function flagParser(fileType) {
//   switch (util.env.build) {
//     case "staging":
//       return stagingPaths[fileType];
//     case "production":
//       return productionPaths[fileType];
//     default:
//       return localPaths[fileType];
//   }
// },

// SassOptions = function sassOptions() {
//   var compression;
//   var route;

//   var parseCompression = function parseCompression () {
//   // if (util.env.build === 'production') {
//     if (util.env.build === 'staging' || util.env.build === 'production') {
//       return {
//         outputStyle: 'compressed'
//       };
//     }
//     else {
//       return {
//         outputStyle: 'expanded'
//       };
//     }
//   };


//   return {
//     compression: parseCompression(),
//     route: flagParser('styles')
//   }
  
// },

// sassOptions = SassOptions(),

// templateOptions = function templateOptions() {
//   return flagParser('templates');
// },

// jsOptions = function jsOptions() {
//   return flagParser('js');
// };


gulp.task('clean', function () {
  
  // var dir;

  // if (util.env.build) {
  //   dir = util.env.build
  // }

  // else {
  //   dir = 'local'
  // }

  return del([
    // 'dist/report.csv',
    // // here we use a globbing pattern to match everything inside the `mobile` folder
    // 'dist/mobile/**/*',
    // // we don't want to clean this file though so we negate the pattern
    // '!dist/mobile/deploy.json'

    'dist/**/*'
  ]);
});




gulp.task('pug', function() {

  // var Locals = { env: "production" };
  var Locals = { env: util.env.build };

  // return gulp.src([sourcePaths.templates, '!dev/pug/includes'])
  return gulp.src(['dev/pug/**/*.pug', '!dev/pug/includes/*'])
    // .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    // .pipe(gulp.dest(localPaths.templates));
    // http://stackoverflow.com/questions/23023650/is-it-possible-to-pass-a-flag-to-gulp-to-have-it-run-tasks-in-different-ways
    // .pipe(gulp.dest(util.env.build === 'staging' ? stagingPaths.templates : localPaths.templates));
    .pipe(gulp.dest(distPaths.templates));
});

gulp.task('htmlReload', function() {
  gulp.src('./local/*.html')
    // .pipe(plumber())
    // .pipe(gulp.dest(localPaths.templates))
    // .pipe(livereload({
    //   host: 'http://localhost',
    //   port: '3030'
    // }));
    .pipe(livereload(server));
});



gulp.task('sass', function () {
  gulp.src(sourcePaths.styles)
    // .pipe(plumber())
    // .pipe(sourcemaps.init())
    .pipe(sass())
    // .pipe(sourcemaps.write())
    // .pipe(gulpif(util.env.build === 'staging' || util.env.build === 'production', autoprefixer()))
    .pipe(autoprefixer())
    // .pipe(gulp.dest(util.env.build === 'staging' ? stagingPaths.styles : localPaths.styles));
    .pipe(gulp.dest(distPaths.styles));
    // .pipe(gulp.dest(localPaths.styles));
});

gulp.task('cssReload', function() {
  gulp.src(distPaths.styles)
    // .pipe(plumber())
    // .pipe(gulp.dest(localPaths.templates))
    // .pipe(livereload({
    //   host: 'http://localhost',
    //   port: '3030'
    // }));
    .pipe(livereload(server));
});



gulp.task('images', function() {
  gulp.src(sourcePaths.images)
    .pipe(gulp.dest(distPaths.images));
});

// gulp.task('etc', function() {
//   if (util.env.build) {
//     if (util.env.build === 'production') {
//       gulp.src(sourcePaths.etc, {base: 'dev/'})
//       .pipe(gulp.dest(productionPaths.templates));
//     }
//   }
// });


gulp.task('js', function() {
  gulp.src(sourcePaths.js)
  .pipe(webpack(require('./webpack.config.js')))

  .on('end', function(){ util.log(process.env.NODE_ENV); })

  // .pipe(gulpif(util.env.build === 'staging' || util.env.build === 'production', uglify()))
  .pipe(gulp.dest(distPaths.js));
});



gulp.task('openbrowser', function() {
  opn( 'http://' + server.host + ':' + server.port );
});



gulp.task('watch', function(){
  livereload.listen();
  
  gulp.watch(sourcePaths.templates, ['pug']);
  
  gulp.watch('./dist/*', ['htmlReload']);
  
  gulp.watch(sourcePaths.styles, ['sass']);
  gulp.watch('./dist/css/*', ['cssReload']);
  
  // gulp.watch(sourcePaths.js, ['js']);
  gulp.watch(sourcePaths.images, ['images']);
});



// gulp.task('default', ['webserver', 'watch', 'openbrowser']);
gulp.task('default', ['watch', 'openbrowser']);

// The build task
// run with --build staging, or (tbd) --build production
// (no --build flag is local)
gulp.task('build', ['pug', 'sass', 'js', 'images']);




