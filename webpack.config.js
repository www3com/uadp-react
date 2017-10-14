const webpack = require('atool-build/lib/webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var join = require("path").join;
var path = require('path');
var glob = require('glob');

module.exports = function(webpackConfig, env) {
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
    webpackConfig.plugins = webpackConfig.plugins.filter(function(plugin) {
        return !(plugin instanceof webpack.optimize.CommonsChunkPlugin);
    });

    webpackConfig.plugins.push(
        new CopyWebpackPlugin([
            { context: './test', from: '**/*.html', to: '' },
            { context: './test', from: '**/*.png', to: '' },
            { context: './test', from: '**/*.jpg', to: '' }
        ])
    );
    /**解决HtmlWebpackPlugin与atool-build内置处理html的loader冲突**/
    webpackConfig.module.loaders.forEach(function (e,i) {
        var str = JSON.stringify(e);
        if(str.indexOf("file?") != -1){
            webpackConfig.module.loaders.splice(i,1);
        }

        if(e.test.toString() == '/\.js$/') {
            webpackConfig.module.loaders.splice(i,1);
        }
    });


    // Support CSS Modules
    // Parse all less files as css module.
  /*webpackConfig.module.loaders.forEach(function(loader, index) {
   if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.less$') > -1) {
   loader.include = /node_modules/;
   loader.test = /\.less$/;
   }
   if (loader.test.toString() === '/\\.module\\.less$/') {
   loader.exclude = /node_modules/;
   loader.test = /\.less$/;
   }
   if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.css$') > -1) {
   loader.include = /node_modules/;
   loader.test = /\.css$/;
   }
   if (loader.test.toString() === '/\\.module\\.css$/') {
   loader.exclude = /node_modules/;
   loader.test = /\.css$/;
   }
   });*/

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
        //pathname = pathname.replace('\\', '/');
        entries[pathname] = ['./' + entry];
    }
    return entries;
}
