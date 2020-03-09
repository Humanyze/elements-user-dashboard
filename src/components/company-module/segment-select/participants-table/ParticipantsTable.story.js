import React from 'react';
import { storiesOf } from '@storybook/react';

import ParticipantsTable from './ParticipantsTable';
import { translations } from 'Src/tests/contextCreators';

import participants from '../fake-participant-data'

const defaultProps = {
    translations: translations,
    showLoading: false,
    participants: null,
};

const onLoad = {
    showLoading:  true
};

const normalParticipants = {
    participants,
}

const createComp = (props) => {
    return (
        <ParticipantsTable {...defaultProps} {...props}/>
    );
};

storiesOf('Participants Table', module)
    .add('loading', () => createComp(onLoad))
    .add('loaded', () => createComp(normalParticipants));
