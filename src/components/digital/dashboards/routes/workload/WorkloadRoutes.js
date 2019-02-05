import React from 'react';
import RouterPaths from 'Src/routerPaths';
import { Route, Switch } from 'react-router-dom';
import { elementsReact } from 'ElementstWebCommon';

const {
  AverageWorkdayLength,
  DigitalDrivers,
  DigitalAllocation,
  RedirectWithSearch,
} = elementsReact;

const WorkloadRoutes = () => {
  return (
    <Switch>
      <Route path={RouterPaths.workload__workdayLength} component={AverageWorkdayLength} />
      <Route path={RouterPaths.workload__drivers} component={DigitalDrivers} />
      <Route path={RouterPaths.workload__timeAllocation} component={DigitalAllocation} />
      <Route component={() => <RedirectWithSearch to={RouterPaths.workload__workdayLength} />} />
    </Switch>
  );
};

export default WorkloadRoutes;
