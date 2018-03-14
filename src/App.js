import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from 'Common/header/Header';
import AppRoutes from './components/AppRoutes';
import ModalRoot from './components/modal/ModalRoot';

const App = () => (
    <div>
        <Router basename={'/deployment'}>
            <div>
                <Header/>
                <AppRoutes/>
                <ModalRoot />
            </div>
        </Router>
    </div>
);

export default App;
