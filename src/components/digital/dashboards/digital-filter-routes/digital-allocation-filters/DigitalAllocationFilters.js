import React, { Fragment } from 'react';
import { createFilterComponent } from 'Src/components/digital/dashboards/digital-filter-routes/createFilterComponent';
import { filterConfigs } from 'Src/components/digital/dashboards/digital-filter-routes/filterConfigs';
import { elementsReact } from 'elements-web-common';

const {
  BackToEmberLink
} = elementsReact;

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
    <BackToEmberLink createLinkUrl={({ datasetId }) => `/digital/dover_top/dover_time_allocation?dataset=${datasetId}`}/>
  </Fragment>
);

export default DigitalAllocationFilters;
