import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import './deployment-selection.scss';

import { setDeploymentsFromStoreDeploymentIds } from 'Redux/deployment/deploymentActions';
import DeploymentSelectionItem from './deployment-selection-item/DeploymentSelectionItem';
import LoadingUI from 'Common/loading/LoadingUI';

const deploymentDataRequestNeeded = ({ deploymentDataSetIds, deploymentsById, requestPending }) => {
    if (!requestPending && deploymentDataSetIds) {
        return deploymentDataSetIds.reduce((needsDispatch, id) => {
            if (!deploymentsById[id]) {
                return true;
            }
            return needsDispatch;
        }, false);
    }
    return false;
};


export const DeploymentSelectionPure = withRouter(({ deploymentData, setDeploymentsFromStoreDeploymentIds }) => {

    if (deploymentDataRequestNeeded(deploymentData)) {
        setDeploymentsFromStoreDeploymentIds();
    }

    const { deploymentDataSetIds, deploymentsById } = deploymentData;
    return (
        <div className='DeploymentSelection__wrapper'>
            <div className='DeploymentSelection'>
                <div>
                    <div className='DeploymentSelection__header'>Choose a deployment</div>
                    <div className='DeploymentSelection__deployment-list'>

                        {deploymentDataSetIds && deploymentDataSetIds.length ?

                            deploymentDataSetIds.map((id) => {
                                    const deployment = deploymentsById[id];
                                    return !!deployment && <DeploymentSelectionItem key={id} deployment={deployment}/>;
                                }
                            )
                            :
                            <div className='DeploymentSelection__loading-background'>
                                <LoadingUI/>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
});


const DeploymentSelection = connect(
    (state) => ({
        deploymentData: state.deployment,
    }),
    { setDeploymentsFromStoreDeploymentIds }
)(DeploymentSelectionPure);

export default DeploymentSelection;
