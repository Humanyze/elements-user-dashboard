import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import customCreateStore from 'Src/redux/createStore';
import { Provider } from 'react-redux';
import { languages } from 'Src/redux/common/language/translations';
import translationDictionary from 'Src/redux/common/language/translations';
import { getCurrentTextDictionaryById } from 'Src/redux/common/language/languageReducer';


const RouterContext = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;
const StoreContext = ({ children }) => {
    const { store } = customCreateStore();
    return <Provider store={store}>{children}</Provider>;
};

const translations = getCurrentTextDictionaryById(translationDictionary, languages.EN.id);

export {
    RouterContext,
    StoreContext,
    translations
};