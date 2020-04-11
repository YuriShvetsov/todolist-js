const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const buildWebpackConfig = merge(baseWebpackConfig, {
    // Build config
    mode: 'production',
    plugins: [],
})

module.exports = new Promise((resolve, reject) => {
    resolve(buildWebpackConfig)
})