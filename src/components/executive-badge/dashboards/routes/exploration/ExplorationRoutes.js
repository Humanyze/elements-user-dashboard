import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { elementsReact, routerPaths as RouterPaths } from 'ElementsWebCommon';

const {
  ExplorationTime,
  ExplorationFrequency,
  ExplorationDistinct,
  RedirectWithSearch,
} = elementsReact;

const ExplorationRoutes = () => {
  return (
    <Switch>
      <Route path={RouterPaths.exploration__frequency} component={ExplorationFrequency}/>
      <Route path={RouterPaths.exploration__time} component={ExplorationTime}/>
      <Route path={RouterPaths.exploration__distinct} component={ExplorationDistinct}/>
      <Route component={() => <RedirectWithSearch to={RouterPaths.exploration__frequency}/>}/>
    </Switch>
  );
};


export default ExplorationRoutes;
