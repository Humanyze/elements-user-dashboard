import React, { Fragment } from 'react';
import { createFilterComponent } from 'Src/components/digital/dashboards/digital-filter-routes/createFilterComponent';
import { filterConfigs } from 'Src/components/digital/dashboards/digital-filter-routes/filterConfigs';
import { elementsReact } from 'ElementsWebCommon';

const {
  BackToEmberLink,
} = elementsReact;

const CommunicationDistributionStreamFilter = createFilterComponent(
  filterConfigs.commByGenderPerGroupPeople
);
const CommunicationDistributionLevelFilter = createFilterComponent(
  filterConfigs.commByGenderPerGroupHours
);

export const CommByGenderPerGroupFiltersPure = () => (
  <Fragment>
    <CommunicationDistributionStreamFilter />
    <CommunicationDistributionLevelFilter />
    <BackToEmberLink createLinkUrl={({ datasetId, }) => `/digital/dcoll_top/dcoll_communication_patterns?dataset=${datasetId}`}/>
  </Fragment>
);

const CommByGenderPerGroupFilters = CommByGenderPerGroupFiltersPure;
export default CommByGenderPerGroupFilters;
