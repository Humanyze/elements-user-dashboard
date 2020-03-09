import SelectSegment from './SelectSegment';

const mockProps = {
    match: {
        params: {
            datasetid: 5
        }
    },
    fetchDeploymentById: () => {}
};

testRenderWithStore(SelectSegment, mockProps)();
