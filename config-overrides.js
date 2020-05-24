const webpack = require('webpack')
const { resolve } = require('path')
const {
  addDecoratorsLegacy,
  override,
  addBabelPlugins,
  addLessLoader,
  fixBabelImports,
  addWebpackAlias
} = require('customize-cra')
const WebpackBar = require('webpackbar')

const addPlugins = () => config => {
  config.plugins.push(
    new WebpackBar({
      color: '#faad14',
      name: '❖'
    }),
    require('autoprefixer'),
    new webpack.ProvidePlugin({
      'window.less': 'less'
    })
  )
  Object.assign(config, {
    devtool: process.env.SOURCE_MAP ? 'source-map' : false,
    optimization: {
      ...config.optimization,
      namedModules: true,
      namedChunks: true,
      splitChunks: {
        ...config.optimization.splitChunks,
        cacheGroups: { default: false }
      }
    }
  })

  return config
}

module.exports = override(
  addDecoratorsLegacy(),
  ...addBabelPlugins(
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-transform-spread'
  ),
  fixBabelImports('import', {
    style: true,
    libraryDirectory: 'es',
    libraryName: 'antd'
  }),
  addLessLoader({
    javascriptEnabled: true
  }),
  addWebpackAlias({
    '@constants': resolve(__dirname, './src/constants'),
    '@components': resolve(__dirname, './src/components'),
    '@misc': resolve(__dirname, './src/misc'),
    '@utils': resolve(__dirname, 'src/utils'),
    '@assets': resolve(__dirname, './src/assets'),
    '@routers': resolve(__dirname, 'src/routers'),
    '@graphql': resolve(__dirname, './src/graphql'),
    '@stores': resolve(__dirname, 'src/stores'),
    '@pages': resolve(__dirname, 'src/pages')
  }),
  addPlugins()
)
