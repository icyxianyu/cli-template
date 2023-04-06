const { merge } = require('webpack-merge')

const commonConfig = require("./index.js")

const devConfig={
    mode: 'development',
    devServer: {
        //自定义端口
        port: 8000,
        //自动打开浏览器
        open: true,
        //  HMR 开启
        hot:true,
    },
    optimization: {
        //development模式下做tree shaking时，需要做如下配置，production模式不需要。
        usedExports: true, //识别无用代码
        minimize: true, //压缩代码
        concatenateModules: true, //模块合并    
    },
}

module.exports = merge(commonConfig, devConfig);
