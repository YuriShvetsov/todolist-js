/* Base config */

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const PATHS = {
    dist: path.join(__dirname, '../dist'),
    src: path.join(__dirname, '../src'),
}
const postcssOptions = {
    plugins: [
        require('autoprefixer')({}),
        require('cssnano')({
            preset: [
                'default',
                {
                    discardComments: {
                        removeAll: true
                    }
                }
            ]
        })
    ]
}

module.exports = {
    entry: {
        app: PATHS.src
    },
    output: {
        filename: 'assets/js/[name].[chunkhash:8].js',
        path: PATHS.dist,
        sourceMapFilename: '[name].[hash:8].map'
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
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
                        options: {
                            postcssOptions
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/i,
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
                        options: {
                            postcssOptions
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|webp)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: `${PATHS.src}/index.html`,
            filename: 'index.html',
            inject: true
        }),
        new MiniCssExtractPlugin({
            filename: `assets/css/[name].[chunkhash:8].css`
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: `${PATHS.src}/assets/images`,
                    to: 'assets/images'
                },
                {
                    from: `${PATHS.src}/assets/fonts`,
                    to: 'assets/fonts'
                }
            ]
        })
    ],
    resolve: {
        extensions: ['.js', '.json']
    },
    externals: {
        paths: PATHS
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
    }
}
