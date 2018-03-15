import React from 'react';
import { storiesOf } from '@storybook/react';
import { RouterContext, StoreContext } from 'TestUtils/contextCreators.js';

import ParticipantsTable from './ParticipantsTable';
const defaultProps = {

};

const createComp = (props) => <StoreContext><ParticipantsTable {...defaultProps} {...props}/></StoreContext>;

storiesOf('Participants Table', module)
    .add('initial', () => createComp());
    