import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { elementsReact, routerPaths as RouterPaths } from 'ElementsWebCommon';

const {
  WorkAllocation,
  InteractionGaps,
  TeamCohesion,
  RedirectWithSearch,
} = elementsReact;

const CollaborationRoutes = () => {
  return (
    <Switch>
      <Route path={RouterPaths.collaboration__cohesion} component={TeamCohesion} />
      <Route path={RouterPaths.collaboration__interaction} component={InteractionGaps} />
      <Route path={RouterPaths.collaboration__allocation} component={WorkAllocation} />
      <Route component={() => <RedirectWithSearch to={RouterPaths.collaboration__cohesion}/> } />
    </Switch>
  );
};


export default CollaborationRoutes;
