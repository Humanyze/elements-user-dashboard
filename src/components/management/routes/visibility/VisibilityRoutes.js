import React from 'react';
import RouterPaths from 'Src/routerPaths';
import { Route, Switch } from 'react-router-dom';
import { RedirectWithSearch } from 'Src/components/common/link-with-search/LinkWithSearch';
import ManagerVisibility from '../../../common/data-vis-components/manager-visibility/ManagerVisibility';


const VisibilityRoutes = () => {
    return (
        <Switch>
            <Route path={RouterPaths.visibility__manager} component={ManagerVisibility} />
            <Route component={() => <RedirectWithSearch to={RouterPaths.visibility__manager}/> } />
        </Switch>
    );
};


export default VisibilityRoutes;