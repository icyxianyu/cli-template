const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 将css文件合并拆分出来的插件


const  CompressionWebpackPlugin = require('compression-webpack-plugin');
// 压缩js文件

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// 压缩css文件

const WebpPlugin = require('webp-converter-webpack-plugin');
// 将图片转换为webp格式

const { merge } = require('webpack-merge')
// 合并webpack配置 
const commonConfig = require('./index.js');
// 引入公共配置
const TerserPlugin = require('terser-webpack-plugin'); 
// 压缩js文件
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); 
// 清除dist文件夹

const prodConfig={

    mode:"production",

    plugins:[

        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename:'static/css/[name].[hash:5].css'
        }),
        new WebpPlugin({
            quality:0.8}),
        ],

    optimization: {
        splitChunks: {
            chunks: "all",
            minSize: 20000, // 允许新拆出 chunk 的最小体积，也是异步 chunk 公共模块的强制拆分体积
            maxAsyncRequests: 6, // 每个异步加载模块最多能被拆分的数量
            maxInitialRequests: 6, // 每个入口和它的同步依赖最多能被拆分的数量
            enforceSizeThreshold: 50000, // 强制执行拆分的体积阈值并忽略其他限制
            cacheGroups: {
              libs: { // 第三方库
                name: "chunk-libs",
                test: /[\\/]node_modules[\\/]/,
                priority: 10,
                chunks: "initial" // 只打包初始时依赖的第三方
              },
              commons: { // 公共模块包
                name: `chunk-commons`,
                minChunks: 2, 
                priority: 0,
                reuseExistingChunk: true
              }
            },
          },
            minimize: true,
            minimizer: [
                new TerserPlugin(),//压缩js文件
                new CssMinimizerPlugin()//压缩css文件
            ],
    },
}

module.exports = merge(commonConfig, prodConfig)