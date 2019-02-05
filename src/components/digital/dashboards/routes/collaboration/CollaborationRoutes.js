import React from 'react';
import RouterPaths from 'Src/routerPaths';
import { Route, Switch } from 'react-router-dom';
import { elementsReact } from 'elements-web-common';
const {
  Adjacencies,
  CommunicationDistribution,
  DigitalResponseTime,
  RedirectWithSearch,
} = elementsReact;

const CollaborationRoutes = () => {
  return (
    <Switch>
      <Route path={RouterPaths.collaboration__adjacencies} component={Adjacencies} />
      <Route path={RouterPaths.collaboration__communicationDistribution} component={CommunicationDistribution} />
      <Route path={RouterPaths.collaboration__responseTime} component={DigitalResponseTime} />
      <Route component={() => <RedirectWithSearch to={RouterPaths.collaboration__adjacencies} />} />
    </Switch>
  );
};


export default CollaborationRoutes;
