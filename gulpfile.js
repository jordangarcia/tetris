var gulp = require('gulp')
var shell = require('gulp-shell')
var connect = require('gulp-connect')

gulp.task('default', function() {
  connect.server({
    root: 'app',
    port: 1337
  })
})
