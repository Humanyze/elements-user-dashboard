import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import RouterPaths from 'Src/routerPaths';
import { elementsReact } from 'ElementsWebCommon';
import Collaboration from 'Src/components/digital/dashboards/routes/collaboration/Collaboration';
import Inclusion from 'Src/components/digital/dashboards/routes/inclusion/Inclusion';
import Workload from 'Src/components/digital/dashboards/routes/workload/Workload';

const {
  RedirectWithSearch
} = elementsReact;

const DigitalDashboardRoutes = () => {
  return (
    <div className='DigitalRoute'>
      <Switch>
        <Route path={RouterPaths.collaboration} component={Collaboration}/>
        <Route path={RouterPaths.workload} component={Workload} />
        <Route path={RouterPaths.inclusion} component={Inclusion}/>
        <Route path={RouterPaths.deployment} component={() => <RedirectWithSearch to={RouterPaths.collaboration}/>}/>
        <Route component={() => <Redirect to={RouterPaths.selectDeployment}/>}/>
      </Switch>
    </div>
  );
};

export default DigitalDashboardRoutes;
