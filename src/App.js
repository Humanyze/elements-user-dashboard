import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from 'Common/header/Header';
import AppRoutes from './components/AppRoutes';
import ModalRoot from './components/modal/ModalRoot';
import RouterPaths from 'RouterPaths';

import ReactGA from 'react-ga';
ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
ReactGA.pageview(window.location.pathname + window.location.search);

const App = () => (
    <div>
        <Router basename={RouterPaths.basePath}>
                <div>
                    <Header/>
                    <AppRoutes/>
                    <ModalRoot/>
                </div>
        </Router>
    </div>
);

export default App;
