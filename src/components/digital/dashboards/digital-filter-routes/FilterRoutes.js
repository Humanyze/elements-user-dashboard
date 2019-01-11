import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RouterPaths from 'Src/routerPaths';
import AdjacenciesFilters from './adjacencies-filters/AdjacenciesFilters';
import { createFilterComponent } from 'Src/components/digital/dashboards/digital-filter-routes/createFilterComponent';
import { filterConfigs } from 'Src/components/digital/dashboards/digital-filter-routes/filterConfigs';

const DigitalAllocationHoursFilter = createFilterComponent(
  filterConfigs.digitalAllocationHours
);

const FilterRoutes = () => {
  return (
    <Switch>
      <Route path={RouterPaths.collaboration__adjacencies} component={AdjacenciesFilters} />
      <Route path={RouterPaths.workload__timeAllocation} component={DigitalAllocationHoursFilter} />
      {/* NOTE: add other filters here */}
    </Switch>
  );
};

export default FilterRoutes;
