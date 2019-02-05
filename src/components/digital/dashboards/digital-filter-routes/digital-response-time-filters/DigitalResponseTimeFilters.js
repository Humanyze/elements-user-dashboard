import React, { Fragment } from 'react';
import { createFilterComponent } from 'Src/components/digital/dashboards/digital-filter-routes/createFilterComponent';
import { filterConfigs } from 'Src/components/digital/dashboards/digital-filter-routes/filterConfigs';
import { BackToEmberLink } from 'ElementstWebCommon';

const DigitalResponseTimeHoursFilter = createFilterComponent(
  filterConfigs.digitalResponseTimeHours
);

const DigitalResponseTimePeopleFilter = createFilterComponent(
  filterConfigs.digitalResponseTimePeople
);

const DigitalResponseTimeFilters = () => (
  <Fragment>
    <DigitalResponseTimeHoursFilter />
    <DigitalResponseTimePeopleFilter />
    <BackToEmberLink createLinkUrl={({ datasetId }) => `/digital/dover_top/dover_response_time?dataset=${datasetId}`}/>
  </Fragment>
);

export default DigitalResponseTimeFilters;
