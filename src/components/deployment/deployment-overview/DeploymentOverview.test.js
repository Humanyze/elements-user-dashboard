import { DeploymentOverviewPure } from './DeploymentOverview';

const mockProps = {
    match: {
        params: {
            datasetid: 5
        }
    }
};
testRender(DeploymentOverviewPure, mockProps)();