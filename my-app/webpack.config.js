// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';
const stylesHandler = 'style-loader';

const config = {
    entry: './src/index.js',
    resolve: {  
        fallback: {
            "fs": false,
            "tls": false,
            "net": false,
            "path": require.resolve('./EchoEcho/my-app/webpack.config.js/path-browserify'), // Use the 'path-browserify' module as a polyfill
            "zlib": require.resolve('../EchoEcho/my-app/webpack.config.js/browserify-zlib'), // Use the 'browserify-zlib' module as a polyfill
            "http": require.resolve('./EchoEcho/my-app/webpack.config.js/stream-http'), // Use the 'stream-http' module as a polyfill
            "https": require.resolve('./EchoEcho/my-app/webpack.config.js/https-browserify'), // Use the 'https-browserify' module as a polyfill
            "stream": require.resolve('./EchoEcho/my-app/webpack.config.js/stream-browserify'), // Use the 'stream-browserify' module as a polyfill
            "crypto": require.resolve('./EchoEcho/my-app/webpack.config.js/crypto-browserify'), // Use the 'crypto-browserify' module as a polyfill
        } 
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [stylesHandler,'css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
    } else {
        config.mode = 'development';
    }
    return config;
};
