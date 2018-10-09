import React from 'react';
import RouterPaths from 'Src/routerPaths';
import { Route, Switch } from 'react-router-dom';
import { RedirectWithSearch } from 'Src/components/common/link-with-search/LinkWithSearch';
import CommunicationPatterns
  from '../../../common/data-vis-components/communication-patterns/CommunicationPatterns';


const CollaborationRoutes = () => {
    return (
        <Switch>
            <Route path={RouterPaths.communication__patterns} component={CommunicationPatterns} />
            <Route component={() => <RedirectWithSearch to={RouterPaths.communication__patterns}/> } />
        </Switch>
    );
};


export default CollaborationRoutes;
