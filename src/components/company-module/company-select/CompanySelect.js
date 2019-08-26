import React from 'react';
import { connect } from 'react-redux';
import { elementsReact, elementsRedux, routerPaths } from 'ElementsWebCommon';

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
    companies: getAllCompanies(state),
  })
)(({
  companies,
}) => {
  return (
    <CompanySelectionTable {...{ companies, }} />
  );
});

export default CompanySelect;
