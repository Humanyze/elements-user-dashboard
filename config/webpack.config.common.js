const path = require('path');
const paths = require('./paths');

module.exports = {

    resolve: {
        alias: {
            // Support React Native Web
            // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
            'react-native': 'react-native-web',
            'Redux'       : path.resolve(paths.appSrc + '/redux'),
            'Src'         : path.resolve(paths.appSrc),
            'Public'      : path.resolve(paths.appPublic),
            'Story'       : path.resolve(paths.storybookConfig)
        },
    }
};