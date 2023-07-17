/// webpack.config.js
const {DefinePlugin} = require('webpack');

module.exports = {
  ...
  plugins: [
    new DefinePlugin({
      'process.env.REACT_APP_MapboxAccessToken': JSON.stringify(process.env.NODE_ENV == 'production' ? process.env.REACT_APP_MapboxAccessTokenProd : process.env.REACT_APP_MapboxAccessTokenDev)
    })
  ]
};