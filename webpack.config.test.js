var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry:{
        app:[
            'babel-polyfill',
            path.resolve(__dirname,'test/index.js')
        ]
    },
    output:{
        path:path.resolve(__dirname, 'test'),
        filename:'bundle.js'
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        stats: { colors: true },
        proxy: {
            '/19634': {
              target: 'http://rapapi.org/mockjsData/',
              changeOrigin: true
            }
         }
    },
    module:{
        loaders:[
            {
                loader:'babel',
                exclude:[ path.resolve(__dirname,'node_modules') ],
                include:[ path.resolve(__dirname,'test') ],
                test:/\.(js|jsx)$/,
                query:{
                    plugins:["transform-runtime"],
                    presets:['es2015','stage-0','react']
                }
            }
        ]
    },
    resolve:{
        extensions: ['','.js','.jsx','.json']
    }
};