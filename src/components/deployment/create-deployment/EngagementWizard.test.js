import React from 'react';
import EngagementWizard, { machineStates } from './EngagementWizard';
import { StoreContext } from 'Src/tests/contextCreators';


describe('ImportWizard', () => {

    const createComp = (props) => mount(
        <StoreContext>
            <EngagementWizard {...props} />
        </StoreContext>
    );

    it ('should should show 2 pending, 1 active when state is initial', async () => {


        const wrapper = createComp({
            machineState: machineStates.ENTER_METADATA,
            engagementExists: false
        });
        expect(wrapper.find('.metadata.active')).toHaveLength(1);
        expect(wrapper.find('.participants.pending')).toHaveLength(1);
        expect(wrapper.find('.process.pending')).toHaveLength(1);
    });

    it ('Should show complete once metadata has been entered', async () => {

        const wrapper = createComp({
            machineState: machineStates.METADATA_ENTERED,
            engagementExists: false
        });
        expect(wrapper.find('.metadata.complete')).toHaveLength(1);
        expect(wrapper.find('.participants.pending')).toHaveLength(1);
        expect(wrapper.find('.process.pending')).toHaveLength(1);

    });

    it ('Should show participants selected before processing', async () => {

        const wrapper = createComp({
            machineState: machineStates.PARTICIPANTS_SELECTED,
            engagementExists: false
        });
        expect(wrapper.find('.metadata-to-participants.complete')).toHaveLength(1);
        expect(wrapper.find('.participants-to-process.pending')).toHaveLength(1);
        expect(wrapper.find('.metadata.complete')).toHaveLength(1);
        expect(wrapper.find('.participants.complete')).toHaveLength(1);
        expect(wrapper.find('.process.pending')).toHaveLength(1);
    });

    it ('should should show updating/creating while request is out', async () => {
        const wrapper = createComp({
            machineState: machineStates.PROCESSING_ENGAGEMENT,
            engagementExists: false
        });
        expect(wrapper.find('.metadata-to-participants.complete')).toHaveLength(1);
        expect(wrapper.find('.participants-to-process.active')).toHaveLength(1);
        expect(wrapper.find('.metadata.complete')).toHaveLength(1);
        expect(wrapper.find('.participants.complete')).toHaveLength(1);
        expect(wrapper.find('.process.active')).toHaveLength(1);
    });


    it ('Failure of processing should be reported', async () => {
        const wrapper = createComp({
            machineState: machineStates.ENGAGEMENT_PROCESSING_FAILED,
            engagementExists: false
        });
        expect(wrapper.find('.metadata-to-participants.complete')).toHaveLength(1);
        expect(wrapper.find('.participants-to-process.failed')).toHaveLength(1);
        expect(wrapper.find('.metadata.complete')).toHaveLength(1);
        expect(wrapper.find('.participants.complete')).toHaveLength(1);
        expect(wrapper.find('.process.failed')).toHaveLength(1);
    });


    it ('should should show import successful when valid and imported', async () => {
        const wrapper = createComp({
            machineState: machineStates.ENGAGEMENT_PROCESSED,
            engagementExists: false
        });
        expect(wrapper.find('.metadata-to-participants.complete')).toHaveLength(1);
        expect(wrapper.find('.participants-to-process.complete')).toHaveLength(1);
        expect(wrapper.find('.metadata.complete')).toHaveLength(1);
        expect(wrapper.find('.participants.complete')).toHaveLength(1);
        expect(wrapper.find('.process.complete')).toHaveLength(1);
    })
});
