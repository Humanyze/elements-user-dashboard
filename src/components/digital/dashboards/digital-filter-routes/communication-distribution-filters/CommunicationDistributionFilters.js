import React, { Fragment } from 'react';
import { createFilterComponent } from 'Src/components/digital/dashboards/digital-filter-routes/createFilterComponent';
import { filterConfigs } from 'Src/components/digital/dashboards/digital-filter-routes/filterConfigs';
import { elementsReact } from 'ElementsWebCommon';

const {
  BackToEmberLink
} = elementsReact;

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
      <BackToEmberLink createLinkUrl={({ datasetId }) => `/digital/dcoll_top/dcoll_communication_patterns?dataset=${datasetId}`}/>
    </Fragment>
  );

const CommunicationDistributionFilters = CommunicationDistributionFiltersPure;
export default CommunicationDistributionFilters;
