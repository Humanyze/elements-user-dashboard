import React from 'react';
import {storiesOf} from '@storybook/react';
// import {RouterContext, StoreContext} from 'Story/contextWrappers.js';

import ParticipantsTable from './ParticipantsTable';
const defaultProps = {

};

const createComp = (props) => <ParticipantsTable {...defaultProps} {...props}/>;

storiesOf('Participants Table', module)
    .add('initial', () => createComp());
    