import React from 'react';
import {BrowserRouter} from 'react-router-dom';


const RouterContext =({children}) => <BrowserRouter>{children}</BrowserRouter>
const StoreContext =({children}) => <BrowserRouter>{children}</BrowserRouter>

export {
    RouterContext,
    StoreContext
};