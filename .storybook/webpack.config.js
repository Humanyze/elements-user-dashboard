const path = require('path');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const root = resolveApp('');
const appSrc = resolveApp('src');
const public = resolveApp('public');


module.exports = {
    module: {
        rules: [
            {
                test: /\.scss$/,
                loaders: [
                    require.resolve('style-loader'),
                    require.resolve('css-loader'),
                    require.resolve('sass-loader'),
                    {
                        loader: require.resolve('sass-resources-loader'),
                        options: {
                            resources: path.resolve(__dirname, '../src/Global.scss')
                        }
                    }
                ]
            },
            // {
            //     // Exclude `js` files to keep "css" loader working as it injects
            //     // its runtime that would otherwise processed through "file" loader.
            //     // Also exclude `html` and `json` extensions so they get processed
            //     // by webpacks internal loaders.
            //     exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            //     loader: require.resolve('file-loader'),
            //     options: {
            //         name: 'static/media/[name].[hash:8].[ext]',
            //     },
            // },
        ]
    },
    resolve: {
        alias: {
            'Public': path.resolve(public),
            'Src': path.resolve(appSrc),
            'Redux': path.resolve(appSrc + '/redux'),
            'Story': path.resolve(root + '/.storybook')
        }
    }
};