const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname, //webpack이 동작할 root디렉토리
    entry: ['@babel/polyfill', './src/client/index.js', './src/client/index.scss'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle_[name].js'
    },
    devServer: {
        hot: true,
        port: 3000,
        open: true,
        contentBase: path.resolve(__dirname, 'dist'),
        historyApiFallback: true // 이거없으면 리액트 라우터 에러 발생
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'css/style.css' }), //컴파일+번들링CSS파일이 저장될 경로와 이름 지정
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html', //빌드 전에 사용되는 파일
            filename: 'index.html' //빌드 후에 생성될 파일명
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src') 
                ],
                exclude: /node_modules/, 
                use: {
                    loader: 'babel-loader', 
                    options: { //프리셋과 플러그인도 사용
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.scss$/, 
                include: [
                    path.resolve(__dirname, 'src')
                ],
                exclude: /node_modules/, 
                use: [ MiniCssExtractPlugin.loader, "css-loader", "sass-loader" ]
            }
        ]
    },
    resolve: { //import경로 편하게하기
        alias: {
          '~c': path.resolve(__dirname, 'src/client'),
          '~s': path.resolve(__dirname, 'src/server')
        },
    }
}
