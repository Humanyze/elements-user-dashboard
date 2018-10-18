import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import RouterPaths from 'Src/routerPaths';
import DigitalSelectDeployment from 'Src/components/digital/digital-select-deployment/DigitalSelectDeployment';
import Digital from 'Src/components/digital/dashboards/Digital';

const ManagementRoutes = () => {
  return (
    <div className='ManagementRoute'>
      <Switch>
        <Route path={RouterPaths.selectDeployment} component={DigitalSelectDeployment} />
        <Route path={RouterPaths.deployment} component={Digital}/>
        <Route component={() => <Redirect to={RouterPaths.selectDeployment}/>}/>
      </Switch>
    </div>
  );
};

export default ManagementRoutes;