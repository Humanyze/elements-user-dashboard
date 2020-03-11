const path = require('path');
const paths = require('./config/paths');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const findSassModuleRule = (config) => {
  let sassModuleRuleIndex;
  const cssLoaderModule = config.module.rules.find((ruleItem) => {
    if (!ruleItem.oneOf || !ruleItem.oneOf.length) {
      return false;
    }
    sassModuleRuleIndex = ruleItem.oneOf.findIndex(
      (loaderItem) => loaderItem.test &&
        loaderItem.test.toString() === '/\\.module\\.(scss|sass)$/'
    );
    return sassModuleRuleIndex !== -1;
  });

  const sassModuleRule = cssLoaderModule.oneOf[sassModuleRuleIndex];
  return sassModuleRule;
};

// Remove resolve-url-loader which causes SASS modules to not work properly
// TODO: Remove this when below issue gets fixed
// https://github.com/facebook/create-react-app/issues/7682
const removeResolveUrlLoader = (config) => {
  const sassModuleRule = findSassModuleRule(config);
  sassModuleRule.use = sassModuleRule.use.filter(
    (loaderItem) => !(loaderItem.loader && loaderItem.loader.includes('/resolve-url-loader/'))
  );
  return config;
};

const addResolveAliases = (config) => {
  const localAliases = {
    // Support React Native Web
    // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
    'react-native': 'react-native-web',
    'Src': paths.appSrc,
    'Public': path.resolve(paths.appPublic),
    'Assets': path.resolve(`${paths.appSrc}/assets`),
    'Utils': path.resolve(`${paths.appSrc}/elements-web-common/assets/utils`),
    'Redux': path.resolve(`${paths.appSrc}/redux`),
    'ReduxCommon': path.resolve(`${paths.appSrc}/elements-web-common/redux`),
    'Common': path.resolve(`${paths.appSrc}/components/common`),
    //'Story': path.resolve(paths.storybookConfig),
    'TestUtils': path.resolve(`${paths.appSrc}/tests`),
    'ElementsWebCommon': path.resolve(`${paths.appSrc}/elements-web-common`),
    // file aliases
    'appPackageJson': paths.appPackageJson,
    'RouterPaths': path.resolve(`${paths.appSrc}/routerPaths.js`),
  };
  config.resolve.alias = { ...config.resolve.alias, ...localAliases , };
  return config;
};

const stripUnneededMomentLocales = (config) => {
  config.plugins.push(
    // To strip all locales except “en" (“en” is built into Moment and can’t be removed)
    new MomentLocalesPlugin({
      // Flesh out this list to preserve more locales for moment
      localesToKeep: [/*'es-us', '.ru'*/],
    })
  );
  return config;
};

module.exports = function override(_config /* env */) {
  let config = removeResolveUrlLoader(_config);
  config = addResolveAliases(config);
  config = stripUnneededMomentLocales(config);
  return config;
};
