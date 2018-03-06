import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import './App.css';

import Header from './components/common/header/Header';
import AppRoutes from './components/AppRoutes';

const App = () => (
    <div>
        <Header/>
        <Router>
            <AppRoutes/>
        </Router>
    </div>
);

export default App;
