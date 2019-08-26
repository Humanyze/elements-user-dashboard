import React from 'react';
import { Link } from 'react-router-dom';
import { routerPaths } from 'ElementsWebCommon';

const CompanyDetails = () => {
  return (
    <div>
      Company Create
      <Link to={routerPaths.selectCompany}>Back to Company Select</Link>
    </div>
  );
};

export default CompanyDetails;
