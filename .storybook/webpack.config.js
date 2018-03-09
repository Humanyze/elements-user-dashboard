const path = require('path');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const root = resolveApp('');
const appSrc = resolveApp('src');

module.exports = {
    module: {
        rules: [
            {
                test: /\.scss$/,
                loaders: [
                    require.resolve('style-loader'),
                    require.resolve('css-loader'),
                    require.resolve('sass-loader')
                ]
            },
        ]
    },
    resolve: {
        alias: {
            'Redux': path.resolve(appSrc + '/redux'),
            'Story': path.resolve(root + '/.storybook')
        }
    }
};