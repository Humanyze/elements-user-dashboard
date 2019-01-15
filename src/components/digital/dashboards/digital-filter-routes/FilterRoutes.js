import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RouterPaths from 'Src/routerPaths';
import AdjacenciesFilters from './adjacencies-filters/AdjacenciesFilters';
import DigitalAllocationFilters from './digital-allocation-filters/DigitalAllocationFilters';
import CommunicationDistributionFilters from './communication-distribution-filters/CommunicationDistributionFilters';

const FilterRoutes = () => {
  return (
    <Switch>
      <Route path={RouterPaths.collaboration__adjacencies} component={AdjacenciesFilters} />
      <Route path={RouterPaths.workload__timeAllocation} component={DigitalAllocationFilters} />
      <Route path={RouterPaths.collaboration__communicationDistribution} component={CommunicationDistributionFilters} />
      {/* NOTE: add other filters here */}
    </Switch>
  );
};

export default FilterRoutes;
