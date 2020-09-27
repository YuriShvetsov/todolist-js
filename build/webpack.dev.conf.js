/* Development config */

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: false,
    devServer: {
        contentBase: baseWebpackConfig.externals.paths.dist,
        open: true,
        overlay: {
            errors: true,
            warnings: true,
        },
        port: 8081
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({})
    ]
})

module.exports = new Promise((resolve, reject) => {
    resolve(devWebpackConfig)
})
