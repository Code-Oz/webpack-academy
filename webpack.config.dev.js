const path = require("path")
const commonConfig = require("./webpack.config.common")
const merge = require('webpack-merge')

const config = {
    mode: "development",
    devServer: {
        // Show info about dev server
        noInfo: false,
        // Port of dev server
        port: 8080,
        // Asking the server to fallback to index.html in the event that a requested resource cannot be found, need to vue router
        historyApiFallback: true,
        // Allows https in dev server
        // Use this https://stackoverflow.com/questions/35531347/localhost-blocked-on-chrome-with-privacy-error for allow https in localhost directly on chrome
        https: true,
    },
    devtool: 'eval-cheap-source-map',
    // This is the output of Webpack
    output: {
        // From current folder + dist folder that will contains all bundle
        path: path.resolve(__dirname, "dist/"),
        filename: "bundle.dev.js"
    },
    module: {
        rules: [
            {
                // Match file extension
                test: /\.css$/,
                // Use multiple loader
                // Order => from bottom to top
                use: [
                    'style-loader',
                    'css-loader'
                ],
            }
        ]
    }
}


// Merge commonConfig with prod config, priority to prod config
module.exports = merge(commonConfig, {
    ...config,
})
