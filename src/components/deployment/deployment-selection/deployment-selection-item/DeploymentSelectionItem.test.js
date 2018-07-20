import DeploymentSelectionItem from './DeploymentSelectionItem';


describe('DeploymentSelectionItem', () => {
    const deployment = {
        id: '5',
        // name: 'Humanyze'
    };
    testRender(DeploymentSelectionItem, { deployment })();
});
