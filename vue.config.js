// vue.config.js
publicPath: process.env.NODE_ENV === 'production'
module.exports = {
    // options...
    publicPath: process.env.NODE_ENV === 'production' ? '/': `/`,
    devServer: {
        disableHostCheck: true
    }
}