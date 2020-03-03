import React from 'react';
import { storiesOf } from '@storybook/react';
import { RouterContext, StoreContext } from 'TestUtils/contextCreators.js';
import { ErrorBoundary } from 'ElementsWebCommon';
import participants from './fake-participant-data';
import SegmentsOverview from './SegmentsOverview';
import { translations } from 'Src/tests/contextCreators';

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
                    <SegmentsOverview {...defaultProps} {...props}/>
                </ErrorBoundary>
            </RouterContext>
        </StoreContext>
    );
};

storiesOf('SegmentsOverview', module)
    .add('loading', () => createComp(onLoad))
    .add('Stable With Full Participants', () => createComp(normalParticipants));
