import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './deployment-selection-item.scss';


const DeploymentSelectionItem = ({ deployment, }) => {
  return (
    <Link className='DeploymentSelectionItem' to={`/deployment/${deployment.id}`}>
      <div className='DeploymentSelectionItem__name'>{deployment.name}</div>
    </Link>
  );
};

DeploymentSelectionItem.propTypes = {
  deployment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

export default DeploymentSelectionItem;
