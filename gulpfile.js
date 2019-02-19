const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('./src/template/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('./src/template/css'));
});

gulp.task('watch', function () {
  gulp.watch('./src/template/scss/**/*.scss', gulp.series('sass'));
});

gulp.task('default', gulp.series('sass', 'watch'));