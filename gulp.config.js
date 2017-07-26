// Project configuration

// Base directories
export default {
  baseDirectories: {
    dist: 'dist/',
    app: 'app/',
    assets: 'dist/assets'
  },
  routes: {
    fonts: {
      src: './app/fonts/*',
      dest: './dist/fonts'
    },
    images: {
      src: './app/images/*',
      dest: './dist/images/'
    },
    scripts: {
      src: './app/scripts/',
      dest: './dist/scripts',
      all: [
      './app/scripts/**/*.js',
      '!./gulpfile.babel.js',
      '!node_modules/**'
    ]
    },
    styles: {
      src: './app/styles',
      dest: './dist/styles',
      all: './app/styles/**/*.scss'
    },
    views: {
      src: [
        './app/views/**/*.pug',
        '!./app/views/**/_*.pug',
        '!./app/views/_*/**/*.pug',
        '!./app/views/**/**/_*/*.pug'
      ],
      all: './app/views/**',
      dest: './dist'
    }
  }
}
