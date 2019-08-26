import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { Switch } from 'react-router';
import {
  routerPaths,
  elementsRedux
} from 'ElementsWebCommon';
import CompanySelect from './company-select/CompanySelect';
import CompanyDetails from './company-details/CompanyDetails';
import CompanyCreate from './company-create/CompanyCreate';

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
  }, []);
  return (
    <CompanyModuleRoutes />
  );
});


export default CompanyModule;
