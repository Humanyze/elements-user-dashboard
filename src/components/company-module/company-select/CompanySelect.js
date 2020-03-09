import React from 'react';
import { connect } from 'react-redux';
import { elementsReact, elementsRedux } from 'ElementsWebCommon';

const {
  CompanySelectionTable,
} = elementsReact;
const {
  companySelectors: {
    getAllCompanies,
  },
} = elementsRedux;


const CompanySelect = connect(
  (state) => ({
    companies: Object.values(getAllCompanies(state)),
  })
)(({
  companies,
}) => {
  return (
    <CompanySelectionTable {...{ companies, }} />
  );
});

export default CompanySelect;
