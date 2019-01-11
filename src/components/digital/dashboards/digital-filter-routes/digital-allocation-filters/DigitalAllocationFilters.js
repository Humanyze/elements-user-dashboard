import React, { Fragment } from 'react';
import { createFilterComponent } from 'Src/components/digital/dashboards/digital-filter-routes/createFilterComponent';
import { filterConfigs } from 'Src/components/digital/dashboards/digital-filter-routes/filterConfigs';

const DigitalAllocationHoursFilter = createFilterComponent(
  filterConfigs.digitalAllocationHours
);

const DigitalAllocationUnitFilter = createFilterComponent(
  filterConfigs.digitalAllocationUnit
);

const DigitalAllocationFilters = () => (
  <Fragment>
    <DigitalAllocationHoursFilter />
    <DigitalAllocationUnitFilter />
  </Fragment>
);

export default DigitalAllocationFilters;
