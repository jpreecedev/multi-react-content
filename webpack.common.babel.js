/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack'
import { resolve } from 'path'
import HtmlWebPackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'

const isDevelopment = process.env.NODE_ENV !== 'production'

export default {
  entry: {
    main: resolve('./src/index.jsx')
  },
  output: {
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: !isDevelopment
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.module\.s(a|c)ss$/,
        loader: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              camelCase: true,
              sourceMap: isDevelopment
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: !isDevelopment }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.gif', '.png', '.jpg', '.jpeg', '.svg']
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new CopyWebpackPlugin([{ from: './public' }]),
    new webpack.ProvidePlugin({
      React: 'React',
      react: 'React',
      'window.react': 'React',
      'window.React': 'React'
    })
  ]
}
