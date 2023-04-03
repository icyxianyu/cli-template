const path = require("path");

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 将css文件合并拆分出来的插件

const HtmlWebpackPlugin = require('html-webpack-plugin');
// 自动生成html文件
// 并在body标签中使用script标签引入你所有webpack生成的bundle

const  CompressionWebpackPlugin = require('compression-webpack-plugin');
// 开启gZip压缩

const TerserPlugin = require("terser-webpack-plugin");
// 代码丑化

const devMode = process.env.NODE_ENV !== 'production';

const getstyleloaders=(pre)=>{
    return [
            // 'style-loader',  // 将CSS插入到 DOM,

             MiniCssExtractPlugin.loader,

            'css-loader',  // CSS处理器 
            {
                // 类似于css的polyfill
                loader:'postcss-loader',
                options:{
                    postcssOptions:{
                        plugins:['postcss-preset-env']
                    }
                }
            },pre].filter(Boolean)
}

module.exports={
    //入口文件
    entry:"./src/index.js",

    //出口文件
    output:{
        path:path.resolve(__dirname,"../dist"),
        filename:"static/js/[name].js",
        chunkFilename:'static/js/[name].chunk.js',
        assetModuleFilename:"static/media/[hash:10][ext][query]",//asset资源打包
        clean:true,
    },

    //sourve-map模式的开启
    mode:"development",
    devtool:"source-map",
    module:{
        rules:[{
            test:/\.css$/,
            use:getstyleloaders()
        },
        {
            test:/\.less$/,
            use:getstyleloaders('less-loader')
        },{
            test:/\.s[ac]ss$/,
            use:getstyleloaders('sass-loader')
        },{
            test:/\.styl$/,
            use:getstyleloaders('stylus-loader')
        },]
    },
    plugins:[
        new HtmlWebpackPlugin({ //结构与原html一致，且自动引入打包的资源
            template:path.resolve(__dirname,'../public/index.html')
        }),

        new MiniCssExtractPlugin({
            filename:'static/css/[name].[contenthash].css'
        })],
        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin()],
          },

}