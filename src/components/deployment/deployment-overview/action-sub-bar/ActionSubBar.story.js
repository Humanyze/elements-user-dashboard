import React from 'react';
import { storiesOf } from '@storybook/react';
import { RouterContext } from 'TestUtils/contextCreators.js';
import { ActionSubBarPure } from './ActionSubBar';

const defaultProps = {
    deploymentName: 'Humanyze Data'
};

const createComp = (props) => <RouterContext><ActionSubBarPure {...defaultProps} {...props}/></RouterContext>;

storiesOf('Action SubBar', module)
    .add('initial', () => createComp());
    