const gulp = require('gulp');
const babel = require('gulp-babel');

const SOURCE_PATH = 'lib/**/*.js';
const BUILD_PATH = 'dist';

gulp.task('build', () => gulp.src(SOURCE_PATH)
  .pipe(babel({
    presets: ['es2015'],
  }))
  .pipe(gulp.dest(BUILD_PATH)));
