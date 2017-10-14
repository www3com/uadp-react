const webpack = require('atool-build/lib/webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var fs = require('fs-extra');
var join = require("path").join;
var path = require('path');
var glob = require('glob');

module.exports = function(webpackConfig, env) {
    //清空输出目录
    fs.emptyDirSync('./dist');

    webpackConfig.babel.plugins.push('transform-runtime');

    webpackConfig.babel.plugins.push(['import', {
        libraryName: 'antd',
        libraryDirectory: 'lib',
        style: true
    }]);

    // Support hmr
    if (env === 'development') {
        webpackConfig.devtool = '#eval';
        webpackConfig.babel.plugins.push(['dva-hmr', {
            entries: [
                './src/index.js',
            ],
        }]);
    } else {
        webpackConfig.babel.plugins.push('dev-expression');
    }
    //入口文件
    webpackConfig.entry = getEntry('test/**/index.jsx');

    // Don't extract common.js and common.css
    /*webpackConfig.plugins = webpackConfig.plugins.filter(function(plugin) {
      return !(plugin instanceof webpack.optimize.CommonsChunkPlugin);
    });*/

    webpackConfig.plugins.some(function(plugin, i){
        if(plugin instanceof webpack.optimize.CommonsChunkPlugin) {
            webpackConfig.plugins.splice(i, 1, new webpack.optimize.CommonsChunkPlugin({
                name: 'upm/common',
                filename: 'upm/common.js',
                minChunks: 3 // 提取使用5次以上的模块，打包到common里
            }));
            return true;
        }
    });

    /**解决HtmlWebpackPlugin与atool-build内置处理html的loader冲突**/
    webpackConfig.module.loaders.forEach(function (loader,i) {
        // var str = JSON.stringify(loader);
        // if(str.indexOf("file?") != -1){
        //   webpackConfig.module.loaders.splice(i,1);
        // }
        //
        // if(loader.test.toString() == '/\.js$/') {
        //   webpackConfig.module.loaders.splice(i,1);
        // }
        // atool-build 0.9版本需要采用这种方式
        if(loader.test.toString() === '/\\.html?$/'){
            loader.loader = 'html';
        }
        // less 文件中的图片打包处理
        // if (loader.test.toString().indexOf('png|jpg|jpeg|gif') > -1) {
        //   loader.loader = 'url-loader?limit=10&name=images/[name].[ext]';
        // }
    });


    // var pages = Object.keys(getEntry('test/**/*.html'));
    // pages.forEach(function(pathname) {
    //     var conf = {
    //         filename: pathname + '.html', //生成的html存放路径，相对于path
    //         template: 'test/' + pathname + '.html', //html模板路径
    //         inject: false,	//js插入的位置，true/'head'/'body'/false
    //     };
    //
    //
    //     webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
    // });

    webpackConfig.plugins.push(
        new CopyWebpackPlugin([
            { context: './test', from: '**/*.png', to: __dirname + '/dist' },
            { context: './test', from: '**/*.jpg', to: __dirname + '/dist' }
        ])
    );

    return webpackConfig;
};

function getEntry(globPath) {
    var files = glob.sync(globPath);
    var entries = {}, entry, dirname, basename, pathname, extname;
    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        pathname = pathname.substr(4);
        pathname = pathname.replace(/\\/g, '/');
        //pathname = pathname.replace('\\', '/');
        entries[pathname] = ['./' + entry];
    }
    return entries;
}
