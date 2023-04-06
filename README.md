## 模板
vue2 基于webpack的模板

涉及到的plugin和loader:

- loader
    - `style-loader` 将css插入到head标签中
    - `css-loader`  解析css文件
    - `sass-loader`  解析sass文件
    - `less-loader`  解析less文件
    - `vue-loader`  解析vue文件
    - `stylus-loader` 解析stylus文件
    - `babel-loader`  解析js文件
- plugin
    - `html-webpack-plugin`  自动生成html文件 并在body标签中使用script标签引入你所有webpack生成的bundle
    - `css-minimizer-webpack-plugin` 压缩css
    - `terser-webpack-plugin` 压缩 丑化js代码
    - `clean-webpack-plugin` 清除dist文件夹
    - `webp-converter-webpack-plugin` 将图片转换为webp格式
- 额外配置
    - `webpack-dev-server` 本地开发服务器
    - `compression-webpack-plugin` gzip压缩