import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { elementsReact, routerPaths as RouterPaths } from 'ElementsWebCommon';

import Collaboration from './routes/collaboration/Collaboration';
import Exploration from './routes/exploration/Exploration';
import Communication from './routes/communication/Communication';

const {
  RedirectWithSearch,
} = elementsReact;

const ExecutiveDashboardRoutes = () => {
  return (
    <div className='DashboardRoutes'>
      <Switch>
        <Route path={RouterPaths.collaboration} component={Collaboration}/>
        <Route path={RouterPaths.exploration} component={Exploration}/>
        <Route path={RouterPaths.communication} component={Communication}/>
        <Route component={() => <RedirectWithSearch to={RouterPaths.collaboration}/>}/>
      </Switch>
    </div>
  );
};
export default ExecutiveDashboardRoutes;
