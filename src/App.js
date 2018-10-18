import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from 'Common/header/Header';
import AppRoutes from './components/AppRoutes';
import ModalRoot from './components/modal/ModalRoot';
import RouterPaths from 'RouterPaths';

const AppPure = () => (
  <Router basename={RouterPaths.basePath}>
    <div>
      <Header/>
      <AppRoutes/>
      <ModalRoot/>
    </div>
  </Router>
);

const App = AppPure;
export default App;
