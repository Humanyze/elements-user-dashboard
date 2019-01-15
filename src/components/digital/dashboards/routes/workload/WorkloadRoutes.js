import React from 'react';
import RouterPaths from 'Src/routerPaths';
import { Route, Switch } from 'react-router-dom';
import { RedirectWithSearch } from 'Src/components/common/link-with-search/LinkWithSearch';
import DigitalAllocation
  from 'Src/components/common/data-vis-components/digital-allocation/DigitalAllocation';

const WorkloadRoutes = () => {
  return (
    <Switch>
      {/* <Route path={RouterPaths.workload__workdayLength} component={DataValidationMessage} /> */}
      {/* <Route path={RouterPaths.workload__drivers} component={DataValidationMessage} /> */}
      {/* <Route path={RouterPaths.workload__responseTime} component={DataValidationMessage} /> */}
      <Route path={RouterPaths.workload__timeAllocation} component={DigitalAllocation} />
      <Route component={() => <RedirectWithSearch to={RouterPaths.workload__timeAllocation}/> } />
    </Switch>
  );
};


export default WorkloadRoutes;
