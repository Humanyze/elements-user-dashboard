const override = require('../config-overrides');

module.exports = {
    addons: [
        '@storybook/addon-viewport/register',
        '@storybook/addon-knobs/register',
        '@storybook/addon-links/register',
        '@storybook/preset-create-react-app',
    ],
    webpackFinal: (config) => {
        config = override(config)
        //console.dir(config, { depth: null });
        return config;
    }
}
