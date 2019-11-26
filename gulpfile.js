const gulp = require('gulp'); 
const pug = require('gulp-pug');

gulp.task('pug', function() {  
  return gulp.src('views/*.pug')
      .pipe(pug()) // pipe to pug plugin
      .pipe(gulp.dest('dist')); // tell gulp our output folder
});

module.exports = gulp;