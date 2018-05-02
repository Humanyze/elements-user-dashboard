import React from 'react';
import { storiesOf } from '@storybook/react';
import { RouterContext, StoreContext } from 'TestUtils/contextCreators.js';

import ErrorFlashBar from './errorFlashBar';
import App from 'Src/components/deployment/deployment-overview/DeploymentOverview';

const defaultProps = {
    error: {
        id: 5,
        message: '45',
        messageTranslationKey: 'errorMessage__participantExportFailure',

    }
};


const createComp = (props) =>
    <StoreContext><RouterContext><div><App/><ErrorFlashBar {...defaultProps} {...props}/></div></RouterContext></StoreContext>;

storiesOf('Error Flash Bar', module)
    .add('example', () => createComp());
