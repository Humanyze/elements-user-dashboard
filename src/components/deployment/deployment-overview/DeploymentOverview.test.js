import DeploymentOverview from './DeploymentOverview';

const mockProps = {
    match: {
        params: {
            datasetid: 5
        }
    },
    fetchDeploymentById: () => {}
};

console.log(DeploymentOverview);
testRenderWithStore(DeploymentOverview, mockProps)();
