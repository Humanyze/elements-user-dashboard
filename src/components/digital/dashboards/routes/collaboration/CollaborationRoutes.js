import React from 'react';
import RouterPaths from 'Src/routerPaths';
import { Route, Switch } from 'react-router-dom';
import DataValidationMessage
  from 'Src/components/common/data-validation-HOC/data-validation-message/DataValidationMessage';
import { RedirectWithSearch } from 'Src/components/common/link-with-search/LinkWithSearch';
import TeamCohesion from 'Src/components/common/data-vis-components/team-cohesion/TeamCohesion';


const CollaborationRoutes = () => {
  return (
    <Switch>
      <Route path={RouterPaths.collaboration__adjacencies} component={TeamCohesion} />
      <Route path={RouterPaths.collaboration__commDistribution} component={DataValidationMessage} />
      <Route path={RouterPaths.collaboration__responseTime} component={DataValidationMessage} />
      <Route component={() => <RedirectWithSearch to={RouterPaths.collaboration__adjacencies}/> } />
    </Switch>
  );
};


export default CollaborationRoutes;
