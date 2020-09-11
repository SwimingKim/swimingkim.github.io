module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  outputDir: '../docs',
  configureWebpack: {
    devtool: 'source-map'
  }
}