const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname, //webpack이 동작할 root디렉토리
    entry: ['@babel/polyfill', './src/client/index.js', './src/client/index.scss'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'js/bundle_[name].js'
    },
    mode: "development",
    devServer: {
        hot: true,
        port: 3000,
        open: true,
        contentBase: path.resolve(__dirname, 'dist'),
        historyApiFallback: true, // 이거없으면 리액트 라우터 에러 발생
        proxy: {
            "**": "http://localhost:4000" // express 서버주소
        }
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'css/style.css' }), //컴파일+번들링CSS파일이 저장될 경로와 이름 지정
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
                exclude: [ /node_modules/, /__test__/, /\.test.js$/ ],
                use: {
                    loader: 'babel-loader', 
                    options: { //프리셋과 플러그인도 사용
                        presets: ['@babel/preset-env', "@babel/preset-react"],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.scss$/, 
                include: [
                    path.resolve(__dirname, 'src')
                ],
                exclude: [ /node_modules/, /__test__/, /\.test.js$/ ],
                use: [ MiniCssExtractPlugin.loader, "css-loader", "sass-loader" ]
            }
        ]
    },
    resolve: { //import경로 편하게하기
        alias: {
            '@': path.resolve(__dirname),
            '~c': path.resolve(__dirname, 'src/client'),
            '~': path.resolve(__dirname, 'src')
        },
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    name: 'js/vendor/libs'
                }
            }
        }
    }
}
