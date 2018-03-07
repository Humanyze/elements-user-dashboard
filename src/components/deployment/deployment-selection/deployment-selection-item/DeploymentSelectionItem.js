import React from 'react';
import {Link} from 'react-router-dom';

import './deployment-selection-item.scss';


const DeploymentSelectionItem = ({deployment}) => {
    return (
        <Link className='DeploymentSelectionItem' to={`deployment/${deployment.id}`}>
            <div className='DeploymentSelectionItem__name'>{deployment.name}</div>

        </Link>
    )
};

export default DeploymentSelectionItem;
