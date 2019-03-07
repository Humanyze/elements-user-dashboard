import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ExecutiveSelectDeployment from './executive-select-deployment/ExecutiveSelectDeployment';
import ExecutiveDashboard from './dashboards/ExecutiveBadge';
import { routerPaths as RouterPaths } from 'ElementsWebCommon';

const ExecutiveRoutes = () => {
  return (
    <div className='ExecutiveBadgeRoutes'>
      <Switch>
        <Route path={RouterPaths.selectDeployment} component={ExecutiveSelectDeployment} />
        <Route path={RouterPaths.deployment} component={ExecutiveDashboard}/>
        <Route component={() => <Redirect to={RouterPaths.selectDeployment}/>}/>
      </Switch>
    </div>
  );
};

export default ExecutiveRoutes;
