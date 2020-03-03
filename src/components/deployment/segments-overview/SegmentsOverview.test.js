import SegmentsOverview from './SegmentsOverview';

const mockProps = {
    match: {
        params: {
            datasetid: 5
        }
    },
    fetchDeploymentById: () => {}
};

testRenderWithStore(SegmentsOverview, mockProps)();
