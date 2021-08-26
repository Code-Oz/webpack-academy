const path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const cdn = require("./cdn")

const env = process.env.NODE_ENV
const cssLoaders = env === "prod" ?
    [
        MiniCssExtractPlugin.loader,
        'css-loader'
    ] : [
        'style-loader',
        'css-loader'
    ]

const config = {
    mode: "development",
    // Webpack start from this entry point
    entry: {
        myApp: [
            "./src/style.css",
            "./src/main.js",
        ],
    },
    module: {
        rules: [
            {
                // Match file extension
                test: /\.css$/,
                // Order of loader from bottom to up
                use: cssLoaders,
            }
        ]
    },
    // This is the output of Webpack
    output: {
        // From current folder + dist folder that will contains all bundle
        path: path.resolve(__dirname, "dist/"),
        filename: "bundle.js"
    },
    // External lib that will not be put in bundle but use from CDN
    externals: {
        lodash: '_',
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Name output by extract
            filename: "style.css",
        }),
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
            openAnalyzer: true,
            analyzerMode: 'server',
        })
    ],
}

module.exports = config
