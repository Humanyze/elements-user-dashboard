import React from 'react';
import RouterPaths from 'Src/routerPaths';
import { Route, Switch } from 'react-router-dom';
import { RedirectWithSearch } from 'Src/components/common/link-with-search/LinkWithSearch';
import CommunicationByGender from 'Src/components/common/data-vis-components/communication-by-gender/CommunicationByGender';

import DataValidationMessage
  from 'Src/components/common/data-validation-HOC/data-validation-message/DataValidationMessage';


const InclusionRoutes = () => {
  return (
    <Switch>
      <Route path={RouterPaths.inclusion__commByGender} component={CommunicationByGender} />
      <Route path={RouterPaths.inclusion__commByTeam} component={DataValidationMessage} />
      <Route component={() => <RedirectWithSearch to={RouterPaths.inclusion__commByGender}/> } />
    </Switch>
  );
};


export default InclusionRoutes;
