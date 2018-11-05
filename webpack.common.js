const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
//    entry: {
//      app: './src/index.js'
//    },
//    plugins: [
//      new CleanWebpackPlugin(['dist']),
//      new HtmlWebpackPlugin({
//       title: 'Production'
//     })
//    ],
//    output: {
//         filename: '[name].bundle.js',
//         path: path.resolve(__dirname, 'dist')
//     }
    entry: './src/index.jsx',
        output: {
            path: path.resolve('dist'),
            filename: 'bundle.js'
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['react', 'es2015', 'stage-3']
                    }
                },
                {
                    test: /\.css$/,
                    loader: 'style-loader!css-loader'

                },
                {
                    test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/,
                    loader: 'url-loader?limit=100000'

                }
            ]
        },
        // plugins: [new HtmlWebpackPlugin({
        //     template: './src/index.html',
        //     filename: 'index.html',
        //     inject: 'body'
        // })],
        plugins: [
                 new CleanWebpackPlugin(['dist']),
                 new HtmlWebpackPlugin({
                  title: 'Production',
                  template: './src/index.html',
                    filename: 'index.html',
                    inject: 'body'
                })
               ],
        externals: {
            // global app config object
            config: JSON.stringify({
                apiUrl: 'http://localhost:4000'
            })
        }
};