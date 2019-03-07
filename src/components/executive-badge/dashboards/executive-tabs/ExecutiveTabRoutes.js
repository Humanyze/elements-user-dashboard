import React from 'react';

import { Route, Switch } from 'react-router-dom';
import CollaborationTabs from './collaboration-tabs/CollaborationTabs';
import ExplorationTabs from './exploration-tabs/ExplorationTabs';
import VisibilityTabs from './visibility-tabs/VisibilityTabs';
import CommunicationTabs from './communication-tabs/CommunicationTabs';
import { routerPaths as RouterPaths } from 'ElementsWebCommon';

const ManagementTabRoutes = () => {
  return (
    <Switch>
      <Switch>
        <Route path={RouterPaths.collaboration} component={CollaborationTabs} />
        <Route path={RouterPaths.exploration} component={ExplorationTabs} />
        <Route path={RouterPaths.visibility} component={VisibilityTabs} />
        <Route path={RouterPaths.communication} component={CommunicationTabs} />
      </Switch>
    </Switch>
  );
};


export default ManagementTabRoutes;
