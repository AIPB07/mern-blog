const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    module: {
        rules: [
            {
              test: /\.(js|jsx)$/,
              exclude: /(node_modules|bower_components)/,
              loader: "babel-loader",
              options: { presets: ["@babel/env"] }
            },
            {
              test: /\.(sa|sc|c)ss$/,
              use: [
                {
                  loader: MiniCssExtractPlugin.loader
                },
                {
                  loader: "css-loader",
                },
                {
                  loader: "sass-loader",
                  options: {
                    implementation: require('sass')
                  }

                }
              ]
            }
          ]
    },
    resolve: {extensions: [".js", ".jsx", ".scss"]},
    output: {
        path: path.resolve(__dirname, "dist/"),
        publicPath: "/dist/",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: path.join(__dirname, "public/"),
        port: 3000,
        publicPath: "http://localhost:5000/dist/",
        hotOnly: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({filename: "app.bundle.css"})
    ]
}