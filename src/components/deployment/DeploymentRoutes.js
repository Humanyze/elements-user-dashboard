import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SegmentsOverview from './segments-overview/SegmentsOverview';
import DeploymentSelection from './deployment-selection/DeploymentSelection';
import { Redirect, withRouter } from 'react-router-dom';
import CompanyModule from '../company-module/CompanyModule';


const DeploymentRoutes = ({ match, }) => {
  const { path, } = match;

  console.log(path, match);
  return (
    <Switch>
      <Route path={`${path}deployment/:datasetId/:perPage?/:page?`} component={SegmentsOverview}/>
      <Route path={`${path}select-deployment`} component={DeploymentSelection} />
      <Route path={`${path}company`} component={CompanyModule} />
      <Route component={() => <Redirect to={`${path}select-deployment`}/> }/>
    </Switch>
  );
};


export default withRouter(DeploymentRoutes);
