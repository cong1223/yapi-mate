const path = require('path');

module.exports = {
  // 入口文件
  entry: {
    slideBar: './slideBarSrc/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, '..', '..', 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        // 解析jsx文件类型
        test: /\.jsx?$/,
        //
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react'],
          },
        },
      },
      //配置sass
      {
        test: /\.(less|css)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  mode: 'development',
};
