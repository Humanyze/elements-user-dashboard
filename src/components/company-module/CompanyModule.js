import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import {
  routerPaths,
  elementsRedux
} from 'ElementsWebCommon';
import CompanySelect from './company-select/CompanySelect';
import CompanyDetails from './company-details/CompanyDetails';
import CompanyCreate from './company-create/CompanyCreate';

import SelectSegment from './segment-select/SegmentSelect';
import SegmentDetails from './segment-details/SegmentDetails';
import SegmentCreate from './segment-create/SegmentCreate';

const {
  companyActions: {
    fetchCompaniesForUser,
  },
} = elementsRedux;

const CompanyModuleRoutes = () => {
  return (
    <Switch>
      <Route path={routerPaths.selectCompany} component={CompanySelect} />
      <Route path={routerPaths.companyDetails} component={CompanyDetails} />
      <Route path={routerPaths.companyCreate} component={CompanyCreate} />
      <Route path={routerPaths.selectSegment} component={SelectSegment} />
      <Route path={routerPaths.segmentCreate} component={SegmentCreate} />
      <Route path={routerPaths.segmentDetails} component={SegmentDetails} />
      <Route component={() => <Redirect to={routerPaths.selectCompany}/> }/>
    </Switch>
  );
};

const CompanyModule = connect(
  null,
  { fetchCompaniesForUser, }
)(({
  fetchCompaniesForUser,
}) => {
  React.useEffect(() => {
    fetchCompaniesForUser();
  }, [ fetchCompaniesForUser, ]);
  return (
    <CompanyModuleRoutes />
  );
});


export default CompanyModule;
