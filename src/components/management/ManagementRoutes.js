import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RouterPaths from 'Src/routerPaths';
import Collaboration from './routes/collaboration/Collaboration';
import Exploration from './routes/exploration/Exploration';
import Visibility from './routes/visibility/Visibility';
import Communication from './routes/communication/Communication';
import { RedirectWithSearch } from 'Src/components/common/link-with-search/LinkWithSearch';

const ManagementRoutes = () => {
    return (
        <div className='ManagementRoute'>
            <Switch>
                <Route path={RouterPaths.collaboration} component={Collaboration}/>
                <Route path={RouterPaths.exploration} component={Exploration}/>
                <Route path={RouterPaths.visibility} component={Visibility}/>
                <Route path={RouterPaths.communication} component={Communication}/>
                <Route component={() => <RedirectWithSearch to={RouterPaths.collaboration}/>}/>
            </Switch>
        </div>
    );
};

export default ManagementRoutes;