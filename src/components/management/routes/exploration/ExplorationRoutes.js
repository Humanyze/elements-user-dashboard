import React from 'react';
import RouterPaths from 'Src/routerPaths';
import { Route, Switch } from 'react-router-dom';
import ExplorationFrequency from '../../../common/data-vis-components/exploration-frequency/ExplorationFrequency';
import ExplorationDistinct from '../../../common/data-vis-components/distinct-team-interactions/DistinctTeamInteractions';
import { RedirectWithSearch } from 'Common/link-with-search/LinkWithSearch';
import ExplorationTime from '../../../common/data-vis-components/exploration-time/ExplorationTime';


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
