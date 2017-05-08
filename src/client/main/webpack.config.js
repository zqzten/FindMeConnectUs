const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/js/main.js",
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            { test: /\.(jpe?g|png|svg|woff2?|eot|ttf|otf)$/, use: "file-loader?name=[path][name].[ext]" },
            { test: /\.css$/, use: ["style-loader", "css-loader"] }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "main.html",
            template: "./src/main.html"
        })
    ],
    devServer: {
        contentBase: "dist"
    }
};
