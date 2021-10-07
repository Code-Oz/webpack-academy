const path = require("path")
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
            "./src/index.ts",
        ],
    },
    // External lib that will not be put in bundle but use from CDN
    externals: {
        lodash: '_',
        vue: 'Vue',
    },
    // The resolve object allows you to configure how webpack’s module resolution works
    resolve: {
        // Just alias
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, "./src/"),
            'style': path.resolve(__dirname, "./src/style/"),
        }
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: "ts-loader",
            exclude: /node_modules/,
            options: {
                // Tell to ts-loader: if you check .vue file extension, handle it like a ts file
                appendTsSuffixTo: [/\.vue$/]
            }
        }, {
            test: /\.vue$/,
            loader: "vue-loader",
        }]
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
