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
      dest: './dist/scripts'
    },
    styles: {
      src: './app/styles',
      dest: './dist/styles'
    }
  }
}
