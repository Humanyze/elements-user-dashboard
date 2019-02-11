import React, { Fragment } from 'react';
import { elementsReact } from 'ElementsWebCommon';

const {
  BackToEmberLink
} = elementsReact;

const CommByGenderFilters = () => (
  <Fragment>
    <BackToEmberLink createLinkUrl={({ datasetId }) => `/digital/ddni_top/ddni_gender_balance_overall?dataset=${datasetId}`}/>
  </Fragment>
);

export default CommByGenderFilters;
