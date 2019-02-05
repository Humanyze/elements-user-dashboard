import React, { Fragment } from 'react';
import { elementsReact } from 'elements-web-common';

const {
  BackToEmberLink
} = elementsReact;

const CommByGenderFilters = () => (
  <Fragment>
    <BackToEmberLink createLinkUrl={({ datasetId }) => `/digital/ddni_top/ddni_gender_balance_overall?dataset=${datasetId}`}/>
  </Fragment>
);

export default CommByGenderFilters;
