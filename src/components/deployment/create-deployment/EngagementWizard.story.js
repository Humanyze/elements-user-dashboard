import React from 'react';
import { storiesOf } from '@storybook/react';
import EngagementWizard, { machineStates } from './EngagementWizard';
import { withKnobs } from '@storybook/addon-knobs/react';
import { StoreContext } from 'Src/tests/contextCreators';

const createComp = (props) => {
    return (
        <StoreContext>
            <EngagementWizard {...props}/>
        </StoreContext>
    );
};

let stories = storiesOf('EngagementWizard', module)
    .addDecorator(withKnobs);

[true, false].forEach((engagementExists) => {
    const extraKey = engagementExists ? "Update" : "Create";

    stories
        .add(`${extraKey}: Entering Metadata`, () => createComp({
            machineState: machineStates.ENTER_METADATA,
            engagementExists: engagementExists}))
        .add(`${extraKey}: MetaData entered`, () => createComp({
            machineState: machineStates.METADATA_ENTERED,
            engagementExists: engagementExists}))
        .add(`${extraKey}: Selecting Participants`, () => createComp( {
            machineState: machineStates.SELECT_PARTICIPANTS ,
            engagementExists: engagementExists}))
        .add(`${extraKey}: Participants Selected`, () => createComp( {
            machineState: machineStates.PARTICIPANTS_SELECTED ,
            engagementExists: engagementExists}))
        .add(`${extraKey}: Processing Engagement`, () => createComp({
            machineState: machineStates.PROCESSING_ENGAGEMENT,
            engagementExists: engagementExists}))
        .add(`${extraKey}: Completed`, () => createComp( {
            machineState: machineStates.ENGAGEMENT_PROCESSED,
            engagementExists: engagementExists}))
        .add(`${extraKey}: Processing Failed`, () => createComp({
            machineState: machineStates.ENGAGEMENT_PROCESSING_FAILED,
            engagementExists: engagementExists}));
});
