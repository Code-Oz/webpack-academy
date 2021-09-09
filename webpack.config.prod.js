const path = require("path")
const commonConfig = require("./webpack.config.common")
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyPlugin = require("copy-webpack-plugin")

const config = {
    mode: "production",
    module: {
        rules: [
            {
                // Match file extension
                test: /\.css$/,
                // Order of loader from bottom to up
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
            }
        ]
    },
    // This is the output of Webpack
    output: {
        // From current folder + dist folder that will contains all bundle
        path: path.resolve(__dirname, "dist/"),
        filename: "[name].[contenthash:8].js"
    },
    optimization: {
        minimize: true,
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Name output by extract
            filename: "[name].css",
        }),
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, "src/static"), to: "static" }
            ],
        }),
    ],
}

// Merge commonConfig with prod config, priority to prod config
module.exports = merge(commonConfig, {
    ...config,
})
