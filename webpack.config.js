const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const {VueLoaderPlugin} = require('vue-loader');
const webpack = require('webpack');

module.exports = {
    entry:'./app.js',
    output:{
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/, 
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            { 
                test: /\.json$/,
                use: 'json-loader' 
            },
            { 
                test:/\.(s*)css$/, 
                use:['style-loader','css-loader', 'sass-loader','vue-style-loader'] 
            },
            {
                test: /\.styl(us)?$/,
                use: [
                  'vue-style-loader',
                  'css-loader',
                  'stylus-loader'
                ]
            }
        ]
    },
    
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__ : false
        }),
    ],
    devServer: {
        host: "localhost",
        port: process.env.PORT || 8000,
        open: true,
        hot: true,
    },
}