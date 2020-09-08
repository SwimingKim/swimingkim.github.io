module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/vue-github-pages/'
      : '/',
      outputDir: 'docs'
  }