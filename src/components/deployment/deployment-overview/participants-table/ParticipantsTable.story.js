import React from 'react';
import { storiesOf } from '@storybook/react';
import { RouterContext, StoreContext } from 'TestUtils/contextCreators.js';

import ParticipantsTable from './ParticipantsTable';
import { translations } from 'Src/tests/contextCreators';
const defaultProps = {
    translations: translations
};

const createComp = (props) => <StoreContext><RouterContext><ParticipantsTable {...defaultProps} {...props}/></RouterContext></StoreContext>;

storiesOf('Participants Table', module)
    .add('initial', () => createComp());
    