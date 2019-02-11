import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import customCreateStore from 'Src/redux/createStore';
import { Provider } from 'react-redux';
import { elementsRedux } from 'ElementsWebCommon';

const {
  languages,
  translations: translationsDictionary,
  languageSelectors: {
    getCurrentTextDictionaryById,
  },
} = elementsRedux;

const RouterContext = ({ children, }) => <BrowserRouter>{children}</BrowserRouter>;
const StoreContext = ({ children, }) => {
  const { store, } = customCreateStore();
  return <Provider store={store}>{children}</Provider>;
};

const translations = getCurrentTextDictionaryById(translationsDictionary, languages.EN.id);

export {
  RouterContext,
  StoreContext,
  translations
};
