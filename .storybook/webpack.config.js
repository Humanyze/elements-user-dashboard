const autoprefixer = require('autoprefixer');
const path = require('path');
const commonConfig = require('../config/webpack.config.common');

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9',
                                    ],
                                    flexbox: 'no-2009',
                                }),
                            ],
                        },
                    },
                ],
            },
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
            }
        ]
    },
    resolve: {
        ...commonConfig.resolve
    }
};