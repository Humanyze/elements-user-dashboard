import React from 'react';
import RouterPaths from 'Src/routerPaths';
import { Route, Switch } from 'react-router-dom';
import Adjacencies
  from 'Common/data-vis-components/adjacencies/Adjacencies';
import CommunicationDistribution
  from 'Common/data-vis-components/communication-distribution/CommunicationDistribution';
import { RedirectWithSearch } from 'Src/components/common/link-with-search/LinkWithSearch';
import DigitalResponseTime
    from '../../../../common/data-vis-components/digital-response-time/DigitalResponseTime';


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
