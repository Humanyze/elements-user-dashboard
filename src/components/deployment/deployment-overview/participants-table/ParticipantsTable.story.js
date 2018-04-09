import React from 'react';
import { storiesOf } from '@storybook/react';
import { RouterContext, StoreContext } from 'TestUtils/contextCreators.js';

import ParticipantsTable from './ParticipantsTable';
import { translations } from 'Src/tests/contextCreators';
const defaultProps = {
    translations: translations,
    showLoading: false,
    numberOfPages: 20,
    activePageNumber: 10
};

const onLoad = {
    showLoading:  true
};

const onQuickSwitch = {
    paginationLoading: true
};

const normalParticipants = {

}

const createComp = (props) => <StoreContext><RouterContext><ParticipantsTable {...defaultProps} {...props}/></RouterContext></StoreContext>;

storiesOf('Participants Table', module)
    .add('loading', () => createComp(onLoad))
    .add('quick Pagination Load', () => createComp(onQuickSwitch))
    .add('Stable With Full Participants', () => createComp(normalParticipants));
