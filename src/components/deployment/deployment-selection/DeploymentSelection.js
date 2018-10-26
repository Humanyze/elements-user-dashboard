import React from 'react';
import { connect } from 'react-redux';

import './deployment-selection.scss';

import { setDeploymentsFromStoreDeploymentIds } from 'Redux/common/deployment/deploymentActions';
import { compose, lifecycle, mapProps } from 'recompose';
import DeploymentSelectionList from 'Src/components/common/deployment-selection-list/DeploymentSelectionList';
import { getDeploymentDataSets, getDeploymentRequestPending } from 'Src/redux/common/deployment/deploymentReducer';


const enhance = compose(
  connect(
    (state) => ({
      deployments: getDeploymentDataSets(state),
      requestPending: getDeploymentRequestPending(state)
    }),
    { setDeploymentsFromStoreDeploymentIds }
  )
  ,
  lifecycle({
    componentDidMount() {
      this.props.setDeploymentsFromStoreDeploymentIds();
    },
  }),
  mapProps(({ deployments, ...rest }) => {
    return {
      deployments: deployments && deployments.map(deployment => ({
        ...deployment,
        link: `/deployment/${deployment.id}`
      })),
      ...rest
    };
  })
);


export const DeploymentSelectionPure = ({ deployments, requestPending }) => {
  const selectionProps = {
    deployments,
    loading: requestPending
  };

  return (
    <DeploymentSelectionList {...selectionProps} />
  );
};

const DeploymentSelection = enhance(DeploymentSelectionPure);

export default DeploymentSelection;
