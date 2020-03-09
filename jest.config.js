module.exports = {
  'collectCoverageFrom': [
    'src/**/*.{js,jsx,mjs}',
    '!src/**/*.story.js',
    '!src/tests/**',
  ],
  //'snapshotSerializers': [ 'enzyme-to-json/serializer', ],

  //'coveragePathIgnorePatterns': ['src/**/*.{js,jsx,mjs}',],

  'setupFiles': [
    '<rootDir>/config/polyfills.js',
    '<rootDir>/src/setupTests.js',
  ],
  'testMatch': [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs}',
    '<rootDir>/src/**/?(*.)(spec|test).{js,jsx,mjs}',
    '<rootDir>/src/**/?(*.)(!story).{js,jsx,mjs}',
  ],
  'testEnvironment': 'node',
  'testURL': 'http://localhost',
  'transform': {
    '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|mjs|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
  },
  'transformIgnorePatterns': [ '/node_modules/.+\\.(js|jsx|mjs)$', ],

  'modulePaths': [ '<rootDir>/src', ],
  'moduleNameMapper': {
    '^react-native$': 'react-native-web',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^Common(.*)$': '<rootDir>/src/components/common$1',
    '^appPackageJson': '<rootDir>/package.json',
    '^Src(.*)$': '<rootDir>/src$1',
    '^Public(.*)$': '<rootDir>/public$1',
    '^Assets(.*)$': '<rootDir>/src/assets$1',
    '^Redux([a-z/]*)$': '<rootDir>/src/redux$1',
    '^ReduxCommon(.*)$': '<rootDir>/src/elements-web-common/redux$1',
    '^Utils(.*)$': '<rootDir>/src/elements-web-common/assets/utils$1',
    '^TestUtils(.*)$': '<rootDir>/src/tests$1',
    '^ElementsWebCommon(.*)$': '<rootDir>/src/elements-web-common$1',
    '^RouterPaths': '<rootDir>/src/routerPaths.js',
  },
  'moduleFileExtensions': [
    'js',
    'ts',
    'mjs',
    'jsx',
    'tsx',
    'json',
    'web.jsx',
    'web.js',
    'jsx',
    'node',
  ],
};
