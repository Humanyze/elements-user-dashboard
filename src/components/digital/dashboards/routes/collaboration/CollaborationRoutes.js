import React from 'react';
import RouterPaths from 'Src/routerPaths';
import { Route, Switch } from 'react-router-dom';
import Adjacencies
  from 'Common/data-vis-components/adjacencies/Adjacencies';
import CommunicationDistribution
  from 'Common/data-vis-components/communication-distribution/CommunicationDistribution';
// import DataValidationMessage
//   from 'Src/components/common/data-validation-HOC/data-validation-message/DataValidationMessage';
import { RedirectWithSearch } from 'Src/components/common/link-with-search/LinkWithSearch';


const CollaborationRoutes = () => {
  return (
    <Switch>
      <Route path={RouterPaths.collaboration__adjacencies} component={Adjacencies} />
      <Route path={RouterPaths.collaboration__communicationDistribution} component={CommunicationDistribution} />
      {/*<Route path={RouterPaths.collaboration__responseTime} component={DataValidationMessage} /> */}
      <Route component={() => <RedirectWithSearch to={RouterPaths.collaboration__adjacencies} />} />
    </Switch>
  );
};


export default CollaborationRoutes;
