import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { elementsReact, routerPaths as RouterPaths } from 'ElementsWebCommon';

const {
  CommunicationPatterns,
  RedirectWithSearch,
} = elementsReact;

const CollaborationRoutes = () => {
  return (
    <Switch>
      <Route path={RouterPaths.communication__patterns} component={CommunicationPatterns} />
      <Route component={() => <RedirectWithSearch to={RouterPaths.communication__patterns}/> } />
    </Switch>
  );
};


export default CollaborationRoutes;
