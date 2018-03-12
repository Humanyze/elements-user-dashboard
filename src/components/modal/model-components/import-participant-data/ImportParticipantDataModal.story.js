
import React from 'react';
import { storiesOf } from '@storybook/react';
import ImportEquipmentDataModal from './ImportParticipantDataModal';
import { RouterContext, StoreContext } from 'Story/contextWrappers';


const defaultProps = {
    username: 'demo@humanyze.com'
};


const createComp = (props) => <StoreContext><ImportEquipmentDataModal {...defaultProps} {...props}/></StoreContext>;

storiesOf('Import Participant Data Modal', module)
    .add('initial', () => createComp());
