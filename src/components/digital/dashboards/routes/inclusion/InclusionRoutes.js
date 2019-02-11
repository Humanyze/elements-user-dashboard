import React from 'react';
import RouterPaths from 'Src/routerPaths';
import { Route, Switch } from 'react-router-dom';
import { elementsReact } from 'ElementsWebCommon';
const { CommunicationByGender, DataValidationMessage, RedirectWithSearch, } = elementsReact;

const InclusionRoutes = () => {
  return (
    <Switch>
      <Route path={RouterPaths.inclusion__commByGender} component={CommunicationByGender} />
      <Route path={RouterPaths.inclusion__commByTeam} component={DataValidationMessage} />
      <Route component={() => <RedirectWithSearch to={RouterPaths.inclusion__commByGender} />} />
    </Switch>
  );
};

export default InclusionRoutes;
