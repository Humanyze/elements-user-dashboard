import React, { Fragment } from 'react';
import { createFilterComponent } from 'Src/components/digital/dashboards/digital-filter-routes/createFilterComponent';
import { filterConfigs } from 'Src/components/digital/dashboards/digital-filter-routes/filterConfigs';
import { elementsReact } from 'ElementsWebCommon';

const {
  BackToEmberLink,
} = elementsReact;

const CommByGenderPerGroupStreamFilter = createFilterComponent(
  filterConfigs.commByGenderPerGroupStream
);
const CommByGenderPerGroupPeopleFilter = createFilterComponent(
  filterConfigs.commByGenderPerGroupPeople
);

export const CommByGenderPerGroupFiltersPure = () => (
  <Fragment>
    <CommByGenderPerGroupStreamFilter />
    <CommByGenderPerGroupPeopleFilter />
    <BackToEmberLink createLinkUrl={({ datasetId, }) => `/digital/ddni_top/ddni_gender_balance_team?dataset=${datasetId}`} />
  </Fragment>
);

const CommByGenderPerGroupFilters = CommByGenderPerGroupFiltersPure;
export default CommByGenderPerGroupFilters;
