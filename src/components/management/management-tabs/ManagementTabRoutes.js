import React from 'react';

import { Route, Switch } from 'react-router-dom';
import RouterPaths from 'Src/routerPaths';
import CollaborationTabs from './collaboration-tabs/CollaborationTabs';
import ExplorationTabs from './exploration-tabs/ExplorationTabs';
import VisibilityTabs from './visibility-tabs/VisibilityTabs';
import CommunicationTabs from './communication-tabs/CommunicationTabs';


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