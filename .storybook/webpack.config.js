const autoprefixer = require('autoprefixer');
const path = require('path');

const commonConfig = require('../config/webpack.config.common');

module.exports = {
    module: {
        rules: [
            ...commonConfig.module.rules
        ],
    },
    resolve: {
        ...commonConfig.resolve
    }
};