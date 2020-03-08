import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SegmentsOverview from './segments-overview/SegmentsOverview';
import DeploymentSelection from './deployment-selection/DeploymentSelection';
import { Redirect, withRouter } from 'react-router-dom';
import CompanyModule from '../company-module/CompanyModule';


const DeploymentRoutes = ({ match, }) => {
  const { path, } = match;

  return (
    <Switch>
      <Route path={`${path}deployment`} component={SegmentsOverview}/>
      <Route path={`${path}select-segment`} component={SegmentsOverview} />
      <Route path={`${path}select-deployment`} component={DeploymentSelection} />
      <Route path={`${path}company`} component={CompanyModule} />
      <Route component={() => <Redirect to={`${path}company`}/> }/>
    </Switch>
  );
};


export default withRouter(DeploymentRoutes);
