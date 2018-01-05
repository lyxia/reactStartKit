const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const glob = require('glob');

var webpackConfig = {
    devtool: 'eval-source-map',

    entry: {},
    output: {
        path: __dirname + "/build",//打包后的文件存放的地方
        filename: '[name]/entry.js',    // [name]表示entry每一项中的key，用以批量指定生成后文件的名称
    },

    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        hot: true
    },

    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                },
                exclude: /node_modules/
            },
            {
                test: /.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true, // 指定启用css modules
                            localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                        }
                    },
                    {loader: require.resolve('sass-loader')}
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    },
                        {
                        loader: "css-loader" // translates CSS into CommonJS
                    },
                        {
                        loader: "less-loader" // compiles Less to CSS
                    },
                ]
            }
        ]
    },

    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new CleanWebpackPlugin('build/*.*', {
            root: __dirname,
            verbose: true,
            dry: false
        }),
        new webpack.HotModuleReplacementPlugin(),//热加载插件
    ],
}

function getEntries(globPath) {
    var files = glob.sync(globPath),
        entries = {};

    files.forEach(function(filepath) {
        // 取倒数第二层(view下面的文件夹)做包名
        var split = filepath.split('/');
        var name = split[split.length - 2];

        entries[name] = './' + filepath;
    });

    return entries;
}

var entries = getEntries('app/views/**/index.js');

Object.keys(entries).forEach(function(name) {
    // 每个页面生成一个entry，如果需要HotUpdate，在这里修改entry
    webpackConfig.entry[name] = entries[name];

    // 每个页面生成一个html
    var plugin = new HtmlWebpackPlugin({
        // 生成出来的html文件名
        filename: name + '.html',
        // 每个html的模版，这里多个页面使用同一个模版
        template: "./app/index.tmpl.html",
        // 自动将引用插入html
        inject: true,
        // 每个html引用的js模块，也可以在这里加上vendor等公用模块
        chunks: [name]
    });
    webpackConfig.plugins.push(plugin);
})

module.exports = webpackConfig