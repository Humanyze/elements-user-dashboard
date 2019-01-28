import React, { Fragment } from 'react';
import BackToEmberLink from 'Common/back-to-ember-link/BackToEmberLink';

const CommByGenderFilters = () => (
  <Fragment>
    <BackToEmberLink createLinkUrl={({ datasetId }) => `/digital/ddni_top/ddni_gender_balance_overall?dataset=${datasetId}`}/>
  </Fragment>
);

export default CommByGenderFilters;
