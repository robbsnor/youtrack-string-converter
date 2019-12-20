const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/js/index.js",
    output: {
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // inject css in header
                    "css-loader", // css to commonjs
                    "sass-loader" // scss to css
                ]
            }
        ]
    }
}