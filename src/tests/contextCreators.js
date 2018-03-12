import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import customCreateStore from 'Src/redux/createStore';
import { Provider } from 'react-redux';


const RouterContext =({ children }) => <BrowserRouter>{children}</BrowserRouter>;
const StoreContext =({ children }) => {
    const { store } = customCreateStore();
    return <Provider store={store}>{children}</Provider>;
};

export {
    RouterContext,
    StoreContext
};