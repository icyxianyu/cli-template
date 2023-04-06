const path = require("path");

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 将css文件合并拆分出来的插件

const HtmlWebpackPlugin = require('html-webpack-plugin');
// 自动生成html文件
// 并在body标签中使用script标签引入你所有webpack生成的bundle


const { VueLoaderPlugin } = require('vue-loader')
// vue-loader插件



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
    entry:{
        app:"./src/index.js",
    },
  
    //sourve-map模式的开启
    devtool:"source-map",
    //出口文件

    output:{
        path:path.resolve(__dirname,"../dist"),
        filename:"static/js/[name].[hash:5].js",
        chunkFilename:'static/js/[name].chunk.js',
        assetModuleFilename:"static/media/[hash:10][ext][query]",//asset资源打包
        clean:true,
    },

    module:{
        rules:[{
            test:/\.css$/,
            use:getstyleloaders()
        },{
            test:/\.less$/,
            use:getstyleloaders('less-loader')
        },{
            test:/\.s[ac]ss$/,
            use:getstyleloaders('sass-loader')
        },{
            test:/\.styl$/,
            use:getstyleloaders('stylus-loader')
        },{
            test:/\.(png|jpg?g|gif|webp)$/, //常见资源打包

            type:"asset/resource",

            generator:{//输出文件
                filename:'static/images/[hash][ext][query]' 
                //输出到指定文件夹
                // hash 表示 指定的 哈希扩展值
            }
        },
        {
            test:/.\js$/,
            exclude:/node_modules/,
            use:['babel-loader'],
        },{
            test: /\.vue$/,
            use:"vue-loader"
        }]
    },
    plugins:[
        new HtmlWebpackPlugin({ //结构与原html一致，且自动引入打包的资源
            template:path.resolve(__dirname,'../public/index.html')
        }),
        new MiniCssExtractPlugin({
            filename:'static/css/[name].[hash:5].css'
        }),
        new VueLoaderPlugin(),
        
        ],

}