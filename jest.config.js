module.exports = {
    'collectCoverageFrom'    : [
        'src/**/*.{js,jsx,mjs}'
    ],
    'setupFiles'             : [
        '<rootDir>/config/polyfills.js',
        '<rootDir>/src/setupTests.js'
    ],
    'testMatch'              : [
        '<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs}',
        '<rootDir>/src/**/?(*.)(spec|test).{js,jsx,mjs}'
    ],
    'testEnvironment'        : 'node',
    'testURL'                : 'http://localhost',
    'transform'              : {
        '^.+\\.(js|jsx|mjs)$'             : '<rootDir>/node_modules/babel-jest',
        '^.+\\.css$'                      : '<rootDir>/config/jest/cssTransform.js',
        '^(?!.*\\.(js|jsx|mjs|css|json)$)': '<rootDir>/config/jest/fileTransform.js'
    },
    'transformIgnorePatterns': [
        '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'
    ],

    'modulePaths'         : [
        'src',
        'src/components',
        'src/'
    ],
    'moduleDirectories'   : [
        'node_modules',
        'src/'
    ],
    'moduleNameMapper'    : {
        '^react-native$': 'react-native-web',
        '^common(.*)$'  : '<rootDir>/components/common/$1',
        '^Redux(.*)$'   : '<rootDir>/redux/$1'
    },
    'moduleFileExtensions': [
        'web.js',
        'mjs',
        'js',
        'json',
        'web.jsx',
        'jsx',
        'node'
    ]
};