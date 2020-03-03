import React from 'react';
import { storiesOf } from '@storybook/react';
import { RouterContext, StoreContext } from 'TestUtils/contextCreators.js';
import { ErrorBoundary } from 'ElementsWebCommon';

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
        <StoreContext>
            <RouterContext>
                <ErrorBoundary>
                    <ParticipantsTable {...defaultProps} {...props}/>
                </ErrorBoundary>
            </RouterContext>
        </StoreContext>
    );
};

storiesOf('Participants Table', module)
    .add('loading', () => createComp(onLoad))
    .add('Stable With Full Participants', () => createComp(normalParticipants));
