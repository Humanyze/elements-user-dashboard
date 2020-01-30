module.exports = {
    addons: [
        '@storybook/addon-viewport/register',
        '@storybook/addon-knobs/register',
        '@storybook/addon-links/register',
        '@storybook/preset-create-react-app',
    ],
    webpackFinal: (config) => {
        config.module.rules[3].oneOf[1].options.babelrc = true;
        console.dir(config, { depth: null });
        return config;
    }
}
