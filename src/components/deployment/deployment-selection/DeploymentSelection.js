import React from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {compose, lifecycle, withState} from "recompose";

import './deployment-selection.scss';

import {setDeploymentsFromStoreDeploymentIds} from "Redux/deployment/deploymentActions";
import DeploymentSelectionItem from "./deployment-selection-item/DeploymentSelectionItem";


const withDidMount = lifecycle({
    componentDidMount() {
        const {deploymentDataSetIds, deploymentsById, fetching} = this.props.deploymentData;
        if (!fetching) {
            deploymentDataSetIds.some((id) => { // could do this for only the ones not in storage, but we'll do a total reset
                if (!deploymentsById[id]) {
                    this.props.setDeploymentsFromStoreDeploymentIds();
                    return true;
                }
            })
        }
    }
});

const enhance = compose(
    withState(),

    withDidMount
);

export const DeploymentSelectionPure = withRouter(({deploymentData: {deploymentDataSetIds, deploymentsById}}) => {
    return (
        <div className='DeploymentSelection__wrapper'>
            <div className='DeploymentSelection'>
                <div>
                    <div className='DeploymentSelection__header'>Choose a deployment</div>
                    {
                        deploymentDataSetIds.map((id) => {
                            const deployment = deploymentsById[id];
                                return !!deployment && <DeploymentSelectionItem key={id} deployment={deployment}/>
                            }
                        )
                    }
                </div>
            </div>
        </div>
    )
});


const DeploymentSelection = connect(
    (state) => ({deploymentData: state.deployment}),
    {setDeploymentsFromStoreDeploymentIds}
)(enhance(DeploymentSelectionPure));

export default DeploymentSelection;
