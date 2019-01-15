import React, { Fragment } from 'react';
import { createFilterComponent } from 'Src/components/digital/dashboards/digital-filter-routes/createFilterComponent';
import { filterConfigs } from 'Src/components/digital/dashboards/digital-filter-routes/filterConfigs';
import BackToEmberLink from 'Src/components/common/back-to-ember-link/BackToEmberLink';

const CommunicationDistributionStreamFilter = createFilterComponent(
  filterConfigs.communicationDistributionStream
);
const CommunicationDistributionLevelFilter = createFilterComponent(
  filterConfigs.communicationDistributionLevel
);

export const CommunicationDistributionFiltersPure = () => (
    <Fragment>
      <CommunicationDistributionStreamFilter />
      <CommunicationDistributionLevelFilter />
      <BackToEmberLink />
    </Fragment>
  );

const CommunicationDistributionFilters = CommunicationDistributionFiltersPure;
export default CommunicationDistributionFilters;
