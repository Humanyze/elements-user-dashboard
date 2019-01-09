import React from 'react';
import { compose, lifecycle, mapProps } from 'recompose';
import { connect } from 'react-redux';
import pathToRegexp from 'path-to-regexp';
import DeploymentSelectionList from 'Src/components/common/deployment-selection-list/DeploymentSelectionList';
import { setDeploymentsFromStoreExecutiveIds } from 'Redux/common/deployment/deploymentActions';
import RouterPaths from 'Src/routerPaths';

import {
  getDeploymentRequestPending,
  getExecutiveDeployments
} from 'Src/redux/common/deployment/deploymentReducer';
import { setExecutiveGroups } from 'Src/redux/common/deployment/deploymentActions';


const createDeploymentRoutePath = id => pathToRegexp.compile(RouterPaths.deployment)({ id });

const enhance = compose(
  connect(
    (state) => ({
      deployments: getExecutiveDeployments(state),
      requestPending: getDeploymentRequestPending(state)
    }),
    { setDeploymentsFromStoreExecutiveIds, setExecutiveGroups }
  ),
  lifecycle({
    async componentDidMount() {
      // await on deployments being set, lazy preload the executive groups for all deployments
      await this.props.setDeploymentsFromStoreExecutiveIds();
      this.props.setExecutiveGroups();
    }
  }),
  mapProps(({ deployments, ...rest }) => ({
      ...rest,
      deployments: deployments.map(deployment => ({
        ...deployment,
        link: createDeploymentRoutePath(deployment.id)
      }))
    })
  )
);


const DigitalSelectDeploymentPure = ({ deployments, requestPending }) => {

  const selectionListProps = {
    loading: requestPending,
    deployments
  };

  return (
    <DeploymentSelectionList {...selectionListProps}/>
  );
};

const DigitalSelectDeployment = enhance(DigitalSelectDeploymentPure);

export default DigitalSelectDeployment;
