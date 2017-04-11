var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './assets/js/main.js',
    output: {
        path: './bundles',
        filename: 'build.js'
    },
    watch: false,
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader?-url!autoprefixer-loader!sass-loader")
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin("main.css"),
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        },
        extensions: ['', '.js', '.vue']
    }
}
