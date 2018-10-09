import React from 'react';
import RouterPaths from 'Src/routerPaths';
import { Route, Switch } from 'react-router-dom';
import TeamCohesion
    from 'Common/data-vis-components/team-cohesion/TeamCohesion';
import { RedirectWithSearch } from 'Src/components/common/link-with-search/LinkWithSearch';
import InteractionGaps
  from 'Src/components/common/data-vis-components/interaction-gaps/InteractionGaps';
import WorkAllocation
  from 'Src/components/common/data-vis-components/work-allocation/WorkAllocation';


const CollaborationRoutes = () => {
    return (
      <Switch>
        <Route path={RouterPaths.collaboration__cohesion} component={TeamCohesion} />
        <Route path={RouterPaths.collaboration__interaction} component={InteractionGaps} />
        <Route path={RouterPaths.collaboration__allocation} component={WorkAllocation} />
        <Route component={() => <RedirectWithSearch to={RouterPaths.collaboration__cohesion}/> } />
      </Switch>
    );
};


export default CollaborationRoutes;
