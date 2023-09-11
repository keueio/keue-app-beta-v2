const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');

dotenv.config();


module.exports = {
    mode: 'production', // use 'development' for development mode
    entry: './src/service-worker.js', // your input file
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'service-worker.bundle.js',
        globalObject: 'this' // necessary to make webpack's output compatible with web workers
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    target: 'webworker', // this is important if you're building for Node.js
    plugins: [
        new webpack.DefinePlugin({
            'process.env.VITE_FIREBASE_PROJECT_ID': JSON.stringify(process.env.VITE_FIREBASE_PROJECT_ID),
            'process.env.VITE_FIREBASE_RECAPTCHA_KEY': JSON.stringify(process.env.VITE_FIREBASE_RECAPTCHA_KEY),
            'process.env.VITE_FIREBASE_API_KEY': JSON.stringify(process.env.VITE_FIREBASE_API_KEY)
        })
    ]
};