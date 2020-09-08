module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/vue-github-pages/docs/'
      : '/',
      outputDir: 'docs'
  }