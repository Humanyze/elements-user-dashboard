import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import RouterPaths from 'Src/routerPaths';
import { RedirectWithSearch } from 'Src/components/common/link-with-search/LinkWithSearch';
import Collaboration from 'Src/components/digital/dashboards/routes/collaboration/Collaboration';
import Inclusion from 'Src/components/digital/dashboards/routes/inclusion/Inclusion';
import Workload from 'Src/components/digital/dashboards/routes/workload/Workload';

const DigitalDashboardRoutes = withRouter(({ match }) => {
  console.error(match);
  return (
    <div className='ManagementRoute'>
      <Switch>
        <Route path={RouterPaths.collaboration} component={Collaboration}/>
        <Route path={RouterPaths.workload} component={Workload} />
        <Route path={RouterPaths.inclusion} component={Inclusion}/>
        <Route path={RouterPaths.dashboards} component={() => <RedirectWithSearch to={RouterPaths.collaboration}/>}/>
        <Route component={() => <RedirectWithSearch to={RouterPaths.selectedDeployment}/>}/>
      </Switch>
    </div>
  );
});

export default DigitalDashboardRoutes;