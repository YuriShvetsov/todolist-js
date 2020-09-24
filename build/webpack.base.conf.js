const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/'
}

module.exports = { 
    // Base config
    externals: {
        paths: PATHS
    },
    entry: {
        app: PATHS.src,
        // module: `${PATHS.src}/your-module.js`,
    },
    output: {
        filename: `${PATHS.assets}js/[name].[chunkhash:8].js`,
        path: PATHS.dist,
        // publicPath: '/'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/'
        },
        {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: '/node_modules/'
        },
        {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]'
            }
        },  {
            test: /\.(png|jpg|gif|svg|webp)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]'
            }
        }, {
            test: /\.s[ac]ss$/i,
            use: [
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        url: false
                    }
                }, 
                {
                    loader: 'postcss-loader',
                    options: { sourceMap: true, config: { path : `${PATHS.src}/configs/postcss.config.js` } }
                }, 
                {
                    loader: 'sass-loader',
                    options: { sourceMap: true }
                }
            ],
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        url: false
                    }
                }, 
                {
                    loader: 'postcss-loader',
                    options: { sourceMap: true, config: { path: `${PATHS.src}/configs/postcss.config.js` } }
                },
            ],
        }]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].[contenthash:8].css`,
        }),
        new HtmlWebpackPlugin({
            template: `${PATHS.src}/index.html`,
            filename: './index.html',
            inject: true
        }),
        new CopyWebpackPlugin([
            { from: `${PATHS.src}/${PATHS.assets}images`, to: `${PATHS.assets}images`},
            { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts`},
        ])
    ]
}