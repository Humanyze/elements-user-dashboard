import React from 'react';
import { Switch, Route } from 'react-router-dom';

import DeploymentOverview from './deployment-overview/DeploymentOverview';
import DeploymentSelection from './deployment-selection/DeploymentSelection';
import { Redirect, withRouter } from 'react-router';


const DeploymentRoutes = ({ match }) => {
    const { path } = match;

    return (
        <Switch>
            <Route path={`${path}/deployment/:datasetId/:perPage?/:page?`} component={DeploymentOverview}/>
            <Route path={`${path}/select-deployment`} component={DeploymentSelection} />
            <Route component={() => <Redirect to={`${path}/select-deployment`}/> }/>
        </Switch>
    );
};


export default withRouter(DeploymentRoutes);