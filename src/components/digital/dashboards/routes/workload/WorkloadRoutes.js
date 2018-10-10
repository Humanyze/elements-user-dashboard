import React from 'react';
import RouterPaths from 'Src/routerPaths';
import { Route, Switch } from 'react-router-dom';
import TeamCohesion
  from 'Common/data-vis-components/team-cohesion/TeamCohesion';
import { RedirectWithSearch } from 'Src/components/common/link-with-search/LinkWithSearch';

const CollaborationRoutes = () => {
  return (
    <Switch>
      <Route path={RouterPaths.workload__workdayLength} component={TeamCohesion} />
      <Route path={RouterPaths.workload__drivers} component={TeamCohesion} />
      <Route path={RouterPaths.workload__responseTime} component={TeamCohesion} />
      <Route path={RouterPaths.workload__timeAllocation} component={TeamCohesion} />
      <Route component={() => <RedirectWithSearch to={RouterPaths.workload__workdayLength}/> } />
    </Switch>
  );
};


export default CollaborationRoutes;
