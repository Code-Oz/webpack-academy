const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const cdnDev = require("./cdn.dev")
const cdnProd = require("./cdn.prod")

// Get variable ENV, prod or dev
const env = process.env.NODE_ENV
const isAnalyze = !!process.env.ANALYSE
const analyzerMode = isAnalyze ? "server" : "disabled"
const cdn = env === 'dev' ? cdnDev : cdnProd

const config = {
    // Webpack start from this entry point
    entry: {
        myApp: [
            "./src/style.css",
            "./src/main.js",
        ],
    },
    // External lib that will not be put in bundle but use from CDN
    externals: {
        lodash: '_',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Webpack academy title',
            template: './src/index.html',
            inject: 'body',
            cdn,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        }),
        new BundleAnalyzerPlugin({
            openAnalyzer: isAnalyze,
            analyzerMode: analyzerMode,
        })
    ],
}

module.exports = config
