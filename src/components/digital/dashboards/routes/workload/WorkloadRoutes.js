import React from 'react';
import RouterPaths from 'Src/routerPaths';
import { Route, Switch } from 'react-router-dom';
import { RedirectWithSearch } from 'Src/components/common/link-with-search/LinkWithSearch';
import DataValidationMessage
  from 'Src/components/common/data-validation-HOC/data-validation-message/DataValidationMessage';

const CollaborationRoutes = () => {
  return (
    <Switch>
      <Route path={RouterPaths.workload__workdayLength} component={DataValidationMessage} />
      <Route path={RouterPaths.workload__drivers} component={DataValidationMessage} />
      <Route path={RouterPaths.workload__responseTime} component={DataValidationMessage} />
      <Route path={RouterPaths.workload__timeAllocation} component={DataValidationMessage} />
      <Route component={() => <RedirectWithSearch to={RouterPaths.workload__workdayLength}/> } />
    </Switch>
  );
};


export default CollaborationRoutes;
