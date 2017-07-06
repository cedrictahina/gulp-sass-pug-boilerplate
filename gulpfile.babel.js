'use strict';
import gulp from 'gulp'
// configuration import
import config from './gulp.config.js'
import sass from 'gulp-sass'
import pug from 'gulp-pug'
import browserSync from 'browser-sync'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import sourcemaps from 'gulp-sourcemaps'
import autoprefixer from 'gulp-autoprefixer'
import rename from 'gulp-rename'

// SCSS
gulp.task('styles', () => {
  return gulp.src(config.routes.styles.src+ '/*.scss')
    .pipe(plumber({
        errorHandler: notify.onError({
          title: 'Error: Compiling SCSS.',
          message: '<%= error.message %>'
        })
      }))
    .pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compressed'
		}))
    .pipe(autoprefixer('last 3 versions'))
    .pipe(sourcemaps.write())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(browserSync.stream())
    .pipe(gulp.dest(config.routes.styles.dest))
    .pipe(notify({
			title: 'SCSS Compiled and Minified succesfully!',
			message: 'scss task completed.'
		}));
});