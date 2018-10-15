import React from 'react';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import DeploymentSelectionList from 'Src/components/common/deployment-selection-list/DeploymentSelectionList';
import { setDeploymentsFromStoreExecutiveIds } from 'Redux/common/deployment/deploymentActions';
const enhance = compose(
  connect(
		(state) => ({
			deploymentData: state.deployment
		}),
		{ setDeploymentsFromStoreExecutiveIds }
	),
	lifecycle({
		componentDidMount() {
		console.error(this.props);
			this.props.setDeploymentsFromStoreExecutiveIds();
		}
	}),
);

const DigitalSelectDeploymentPure = ({deploymentData}) => {

  const selectionListProps = {
    deploymentData: {
			...deploymentData,
      deploymentDataSetIds: deploymentData.executiveDataSetIds
    }

  };

  return (
    <DeploymentSelectionList {...selectionListProps}/>
  );
};


export default enhance(DigitalSelectDeploymentPure);
