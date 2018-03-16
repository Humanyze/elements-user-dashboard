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
    ],
    'moduleNameMapper'    : {
        '^react-native$': 'react-native-web',
        '^Common(.*)$'  : '<rootDir>/src/components/common$1',
        '^Redux(.*)$'   : '<rootDir>/src/redux$1',
        '^RouterPaths'  : '<rootDir>/src/routerPaths.js'
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