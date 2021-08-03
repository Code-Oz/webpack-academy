const path = require("path")

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
                use: [
                    'style-loader',
                    'css-loader'
                ],
            }
        ]
    },
    // This is the output of Webpack
    output: {
        // From current folder + dist folder that will contains all bundle
        path: path.resolve(__dirname, "dist/"),
        filename: "bundle.js"
    },
}

module.exports = config
