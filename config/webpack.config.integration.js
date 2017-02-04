const baseConfig = require('./webpack.config.base.js');

// Apply custom integration build config here
const integrationConfig = {};

module.exports = Object.assign({}, baseConfig, integrationConfig);
