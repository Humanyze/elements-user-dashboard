import React from 'react';
import { storiesOf } from '@storybook/react';
import { RouterContext } from 'TestUtils/contextCreators.js';
import { ActionSubBarPure } from './ActionSubBar';
import { translations } from 'Src/tests/contextCreators';

const defaultProps = {
    deploymentName: 'Humanyze Data',
    translations: translations
};

const createComp = (props) => <RouterContext><ActionSubBarPure {...defaultProps} {...props}/></RouterContext>;

storiesOf('Action SubBar', module)
    .add('initial', () => createComp());
    