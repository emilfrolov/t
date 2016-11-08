var path = require("path");
var webpack = require('webpack');

module.exports = {
    entry: {
        app: [
            "./app/index.js",
            'webpack/hot/dev-server',
            'webpack-dev-server/client?http://localhost:8080/',
        ]
    },
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/build/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                cacheDirectory: true,
                plugins: [
                    'transform-decorators-legacy',
                ],
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                }
            },

            {
                test: /\.styl$/,
                // ExtractTextPlugin breaks HMR for CSS
                loader: 'style!css!autoprefixer?browsers=last 2 version!stylus?linenos=true&resolve url=true'
                //loader: 'style!css!autoprefixer?browsers=last 2 version!stylus?linenos=true'
            },
        ]
    },
    devServer: {
        hot: true
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};