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
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import browserify from 'browserify'
import source from 'vinyl-source-stream';
import watchify from 'watchify'
import buffer from 'vinyl-buffer'
import babelify from 'babelify'

// SCSS
gulp.task('styles', () => {
  return gulp.src(config.routes.styles.src + '/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError({
        title: 'Error: Compiling SCSS files.',
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
      title: 'SCSS compiled and minified succesfully!',
      message: 'Styles task completed.'
    }));
});

// compile views
gulp.task('views', () => {
  return gulp.src(config.routes.views.src)
    .pipe(plumber({
      errorHandler: notify.onError({
        title: 'Error: Compiling Pug files.',
        message: '<%= error.message %>'
      })
    }))
    .pipe(pug())
    .pipe(gulp.dest(config.routes.views.dest))
    .pipe(notify({
      title: 'Pug Compiled succesfully.',
      message: 'Views task completed.'
    }));
});

/* Transpiling ES6 code to ES5, concat and minify JS files into a single file */
export function scriptsTask() {
  watchify.args.debug = true;
  watchify.args.entries = config.routes.scripts.src + 'app.js';
  let bundler;
  const getBundler = () => {
    if (!bundler) {
      bundler = watchify(browserify(watchify.args));
    }
    return bundler;
  }
  const bundle = () => {
    return getBundler()
      .transform(babelify)
      .bundle()
      .on('error', function (err) {
        console.log('Error: ' + err.message);
      })
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(config.routes.scripts.dest))
      .pipe(notify({
        title: 'JavaScript task',
        message: 'Your js files has been compiled successfully!'
      }));
  };
  getBundler().on('update', bundle);

  return bundle();
}

gulp.task('scripts', () => {
  return scriptsTask();
});