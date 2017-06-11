var gulp = require('gulp');
var gulpsass = require('gulp-sass');
var clean = require('gulp-clean');
var connect = require('gulp-connect');
var minifyjs = require('gulp-minify');
var cssminify = require('gulp-clean-css');


var paths = {
  csspath: ['src/css/*.scss' ],
  jspath: ['src/js/*.js']
};
var destPath = {
  csspath: 'src/css',
  jspath: 'src/js'
};
var watchPaths = {
  paths: ['src/**/*.scss', 'src/**/*.js' ]
}

//clean js
gulp.task("cleanjs", function(){
      return gulp.src('src/js/*-min.js', {read: false})
        .pipe(clean())
});
//clean css
gulp.task("cleancss", function(){
      return gulp.src('src/css/*.css', {read: false})
        .pipe(clean())
});

//sass to css and minify
gulp.task("sasscssmini", ["cleancss"], function(){
	gulp.src(paths.csspath)
      .pipe(gulpsass())
      .pipe(cssminify())
      .pipe(gulp.dest(destPath.csspath));
});

//js minify
gulp.task("minifyjs", ["cleanjs"], function(){
	gulp.src(paths.jspath)
      .pipe(minifyjs())
      .pipe(gulp.dest(destPath.jspath));
});


// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(watchPaths.paths, ['minifyjs','sasscssmini']); 
});

//Servers
gulp.task('connect', function() {
  connect.server({
    root: 'src',
    port: 3000,
    livereload: true
  });
  
});

gulp.task('default', ['watch','sasscssmini','minifyjs']);