import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RouterPaths from 'Src/routerPaths';
import AdjacenciesFilters from './adjacencies-filters/AdjacenciesFilters';
import DigitalAllocationFilters from './digital-allocation-filters/DigitalAllocationFilters';
import CommunicationDistributionFilters from './communication-distribution-filters/CommunicationDistributionFilters';
import DigitalResponseTimeFilters from './digital-response-time-filters/DigitalResponseTimeFilters';
import BackToEmberLink from 'Common/back-to-ember-link/BackToEmberLink';

const AverageWorkdayLegthBackToEmberLink = () => <BackToEmberLink createLinkUrl={({ datasetId }) => `/digital/dover_top/dover_workday_len?dataset=${datasetId}`} />;
const FilterRoutes = () => {
  return (
    <Switch>
      <Route path={RouterPaths.collaboration__adjacencies} component={AdjacenciesFilters} />
      <Route path={RouterPaths.collaboration__communicationDistribution} component={CommunicationDistributionFilters} />
      <Route path={RouterPaths.collaboration__responseTime} component={DigitalResponseTimeFilters} />
      <Route path={RouterPaths.workload__workdayLength} component={AverageWorkdayLegthBackToEmberLink} />
      <Route path={RouterPaths.workload__timeAllocation} component={DigitalAllocationFilters} />
      {/* NOTE: add other filters here */}
    </Switch>
  );
};

export default FilterRoutes;
