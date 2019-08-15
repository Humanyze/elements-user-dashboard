import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, mapProps } from 'recompose';
import {
  elementsReact,
  elementsRedux
} from 'ElementsWebCommon';

const {
  DeploymentSelectionList,
} = elementsReact;

const {
  deploymentSelectors: {
    getDeploymentRequestPending,
    getDeploymentDataSets,
  },
  deploymentActions: {
    setDeploymentsFromStoreDeploymentIds,
  },
} = elementsRedux;

const enhance = compose(
  connect(
    (state) => ({
      deployments: getDeploymentDataSets(state),
      requestPending: getDeploymentRequestPending(state),
    }),
    { setDeploymentsFromStoreDeploymentIds, }
  )
  ,
  lifecycle({
    componentDidMount() {
      this.props.setDeploymentsFromStoreDeploymentIds();
    },
  }),
  mapProps(({ deployments, ...rest }) => {
    return {
      deployments: deployments && deployments.map((deployment) => ({
        ...deployment,
        link: `/deployment/${deployment.id}`,
      })),
      ...rest,
    };
  })
);


export const DeploymentSelectionPure = ({ deployments, requestPending, }) => {
  const selectionProps = {
    deployments,
    loading: requestPending,
  };

  return (
    <DeploymentSelectionList {...selectionProps} />
  );
};

const DeploymentSelection = enhance(DeploymentSelectionPure);

export default DeploymentSelection;
