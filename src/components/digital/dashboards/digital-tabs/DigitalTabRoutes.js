import React from 'react';

import RouterPaths from 'Src/routerPaths';
import { Route, Switch } from 'react-router-dom';
import CollaborationTabs from 'Src/components/digital/dashboards/digital-tabs/collaboration-tabs/CollaborationTabs';
import InclusionTabs from 'Src/components/digital/dashboards/digital-tabs/inclusion-tabs/InclusionTabs';
import WorkloadTabs from 'Src/components/digital/dashboards/digital-tabs/workload-tabs/WorkloadTabs';


const ManagementTabRoutes = () => {
  return (
    <Switch>
      <Switch>
        <Route path={RouterPaths.collaboration} component={CollaborationTabs}/>
        <Route path={RouterPaths.workload} component={WorkloadTabs}/>
        <Route path={RouterPaths.inclusion} component={InclusionTabs}/>
      </Switch>
    </Switch>
  );
};


export default ManagementTabRoutes;