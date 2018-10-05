import React from 'react';
import { connect } from 'react-redux';

import './deployment-selection.scss';

import { setDeploymentsFromStoreDeploymentIds } from 'Redux/common/deployment/deploymentActions';
import { compose, lifecycle } from 'recompose';
import DeploymentSelectionList from 'Src/components/common/deployment-selection-list/DeploymentSelectionList';


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


const onPropReceive = (props) => {
    const {
        deploymentData: {
            deploymentDataSetIds,
            deploymentsById,
            requestPending
        },
        setDeploymentsFromStoreDeploymentIds
    } = props;
    deploymentDataRequestNeeded({ deploymentDataSetIds, deploymentsById, requestPending }) &&
        setDeploymentsFromStoreDeploymentIds();

};


const enhance = compose(
connect(
    (state) => ({
        deploymentData: state.deployment,
    }),
    { setDeploymentsFromStoreDeploymentIds }
  )
    ,
  lifecycle({
    componentDidMount() {
        onPropReceive(this.props);
    },
    componentDidUpdate() {
        onPropReceive(this.props);
    }
}));


export const DeploymentSelectionPure = ({ deploymentData }) => {
    return (
      <DeploymentSelectionList deploymentData={deploymentData} />
    );
};

const DeploymentSelection = enhance(DeploymentSelectionPure);

export default DeploymentSelection;
