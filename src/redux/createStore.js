import { applyMiddleware, createStore, compose } from 'redux';
import { offline } from '@redux-offline/redux-offline';
import defaultConfig from '@redux-offline/redux-offline/lib/defaults';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const logger = createLogger({});

let middleware = [
    thunk
];

if (process.env.NODE_ENV === 'development') {
    middleware = [
        ...middleware,
        logger
    ];
}


// note: disable for testing new areas, important that code is oblivious to this, develop without in mind then test that it works after introduction
const offlineConfig = {
    ...defaultConfig,
    persistOptions: {
        // note: may switch this to whitelist over blacklist, although persistence in certain cases doesn't hurt
        blacklist: [
            'modal',
            'error',
            'deployment',
            'language'
        ]
    }
};


const customCreateStore = () => {
    const store = createStore(rootReducer, compose(
        applyMiddleware(...middleware),
        offline(offlineConfig),
    ));
    return { store };
};

export default customCreateStore;