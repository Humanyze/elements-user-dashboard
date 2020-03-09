import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Redirect, withRouter } from 'react-router-dom';
import CompanyModule from '../company-module/CompanyModule';


const DeploymentRoutes = ({ match, }) => {
  const { path, } = match;

  return (
    <Switch>
      <Route path={`${path}company`} component={CompanyModule} />
      <Route component={() => <Redirect to={`${path}company`}/> }/>
    </Switch>
  );
};


export default withRouter(DeploymentRoutes);
