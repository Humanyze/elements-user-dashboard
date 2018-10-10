import React from 'react';
import RouterPaths from 'Src/routerPaths';
import { Route, Switch } from 'react-router-dom';
import { RedirectWithSearch } from 'Src/components/common/link-with-search/LinkWithSearch';

import TeamCohesion
  from 'Common/data-vis-components/team-cohesion/TeamCohesion';
import InteractionGaps
  from 'Src/components/common/data-vis-components/interaction-gaps/InteractionGaps';


const CollaborationRoutes = () => {
  return (
    <Switch>
      <Route path={RouterPaths.inclusion__commByGender} component={TeamCohesion} />
      <Route path={RouterPaths.inclusion__commByTeam} component={InteractionGaps} />
      <Route component={() => <RedirectWithSearch to={RouterPaths.inclusion__commByGender}/> } />
    </Switch>
  );
};


export default CollaborationRoutes;
