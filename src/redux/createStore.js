import { applyMiddleware, createStore, compose } from 'redux';
import { offline } from '@redux-offline/redux-offline';
import defaultConfig from '@redux-offline/redux-offline/lib/defaults';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from './rootReducer';
//import rootEpic  from './rootEpic';



// note: disable for testing new areas, important that code is oblivious to this, develop without in mind then
//  test that it works after introduction
const offlineConfig = {
  ...defaultConfig,
  persistOptions: {
    // note: may switch this to whitelist over blacklist, although persistence in certain cases doesn't hurt
    blacklist: [
      'auth',
      'modal',
      'error',
      'user',
      'participants',
      'language',
      'deployment',
      'segments',
      'company',
    ],
  },
};


const customCreateStore = () => {
  const logger = createLogger({});

  const epicMiddleware = createEpicMiddleware();

  let middleware = [
    thunkMiddleware,
    epicMiddleware,
  ];

  if (process.env.NODE_ENV === 'development') {
    middleware = [
      ...middleware,
      logger,
    ];
  }

  // TODO:  Make this more elegant
  //  when running under jest, local storage is not an issue.  redux-offline or jest changed an now if we try to configure offline storage
  //  a message is logged which is flagged by jest since it is emitted after the test completes.  So, if we are running unit tests, don't
  //  load the offline middleware (which has it's own tests) since it can't work for us in these tests anyway.
  const enhancer = process.env.JEST_WORKER_ID ? applyMiddleware(...middleware) : compose(
    applyMiddleware(...middleware),
    offline(offlineConfig)
  );
  const store = createStore(rootReducer, enhancer);

  //epicMiddleware.run(rootEpic)
  return { store, };
};

export default customCreateStore;
