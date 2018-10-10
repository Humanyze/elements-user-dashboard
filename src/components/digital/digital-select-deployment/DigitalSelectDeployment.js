import React from 'react';
import DeploymentSelectionList from 'Src/components/common/deployment-selection-list/DeploymentSelectionList';


const DigitalSelectDeploymentPure = ({}) => {

  const selectionListProps = {
    deploymentData: {
      deploymentDataSetIds: [], deploymentsByIds: {}, requestPending: false
    }

  };

  return (
    <DeploymentSelectionList {...selectionListProps}/>
  );
};


export default DigitalSelectDeploymentPure;