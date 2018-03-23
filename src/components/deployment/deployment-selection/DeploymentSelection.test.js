import React from 'react';
import { DeploymentSelectionPure } from './DeploymentSelection';
import {StoreContext} from '../../../tests/contextCreators';

const setDeploymentsFromStoreDeploymentIds = () => {};
describe('DeploymentSelection', () => {
    testRender(DeploymentSelectionPure)();

    it('should render all deployment paths with valid deploymentData', () => {
        const deploymentDataMock = {
            deploymentDataSetIds: ['1', '2', '3', '4'],
            deploymentsById: {
                '1': { name: 'deplyoment 1', id: '1' },
                '2': { name: 'deplyoment 2', id: '2' },
                '3': { name: 'deplyoment 3', id: '3' },
                '4': { name: 'deplyoment 4', id: '4' }
            }
        };

        const wrapper = mount(<WithRouterContext><DeploymentSelectionPure
            deploymentData={deploymentDataMock}/></WithRouterContext>);

        expect(wrapper.find('.DeploymentSelection__deployment-list').children()).toHaveLength(4);
    });

    it('should skip deployment ids that are not found in deploymentsById', () => {
        const deploymentDataMock = {
            deploymentDataSetIds: ['1', '2', '3', '4'],
            deploymentsById: {
                '1': { name: 'deplyoment 1', id: '1' },
                '5': { name: 'deplyoment 2', id: '2' },
                '3': { name: 'deplyoment 3', id: '3' },
                '9': { name: 'deplyoment 4', id: '4' }
            }
        };

        const wrapper = mount(<WithRouterContext><DeploymentSelectionPure
            deploymentData={deploymentDataMock} setDeploymentsFromStoreDeploymentIds={setDeploymentsFromStoreDeploymentIds}/></WithRouterContext>);

        expect(wrapper.find('.DeploymentSelection__deployment-list').children()).toHaveLength(2);
    });

    it('should show message if user has no deploymentDataSetIds', () => {
        const deploymentDataMock = {
            deploymentDataSetIds: [],
            deploymentsById: {
                '1': { name: 'deplyoment 1', id: '1' },
                '5': { name: 'deplyoment 2', id: '2' },
                '3': { name: 'deplyoment 3', id: '3' },
                '9': { name: 'deplyoment 4', id: '4' }
            }
        };
        const wrapper = mount(<WithRouterContext><DeploymentSelectionPure
            deploymentData={deploymentDataMock}/></WithRouterContext>);

        expect(wrapper.find('.DeploymentSelection__loading-background')).toHaveLength(1);

    });
});

