var gulp = require('gulp')
var shell = require('gulp-shell')
var connect = require('gulp-connect')

gulp.task('default', [
  'server',
  'webpack',
])

gulp.task('server', function() {
  connect.server({
    root: 'app',
    port: 1337
  })
})

gulp.task('webpack', shell.task([
  './node_modules/webpack/bin/webpack.js --watch --progress --colors'
]))
