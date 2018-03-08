import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import './deployment-selection-item.scss';


const DeploymentSelectionItem = ({deployment}) => {
    return (
        <Link className='DeploymentSelectionItem' to={`deployment/${deployment.id}`}>
            <div className='DeploymentSelectionItem__name'>{deployment.name}</div>

        </Link>
    )
};

DeploymentSelectionItem.propTypes = {
    deployment: PropTypes.shape({
        id: PropTypes.string.required,
        name: PropTypes.string.required
    })
};

export default DeploymentSelectionItem;
