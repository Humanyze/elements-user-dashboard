import React from 'react';
import { storiesOf } from '@storybook/react';
import { RouterContext, StoreContext } from 'TestUtils/contextCreators.js';
import  { DeploymentSelectionPure } from './DeploymentSelection';
import { translations } from 'Src/tests/contextCreators';

const defaultProps = {
    deploymentData: {
        deploymentDataSetIds: [],
        deploymentsById: {

        },
        requestPending: true
    },
    translations: translations,
};

const deploymentDataMock = {
    deploymentData: {
        deploymentDataSetIds: ['1', '2', '3', '4'],
        deploymentsById     : {
            '1': { name: 'deplyoment 1', id: '1' },
            '2': { name: 'deplyoment 2', id: '2' },
            '3': { name: 'deplyoment 3', id: '3' },
            '4': { name: 'deplyoment 4', id: '4' }
        }
    }
};


const emptyDataMock = {
    deploymentData: {
        deploymentDataSetIds: [],
        deploymentsById     : {
        }
    }
};


const createComp = (props) => {
    return (
        <StoreContext>
            <RouterContext>
                <DeploymentSelectionPure {...defaultProps} {...props}/>
            </RouterContext>
        </StoreContext>);
};

storiesOf('DeploymentSelection', module)
    .add('pre-load', () => createComp())
    .add('with Deployments', () => createComp(deploymentDataMock))
    .add('no deployments', () => createComp(emptyDataMock));
