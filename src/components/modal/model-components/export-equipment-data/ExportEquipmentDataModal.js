import React, { Component } from 'react';
import LightBoxWrapper from '../LightBoxWrapper/LightBoxWrapper';

const ExportEquipmentDataModal = (props) => {
    return (
        <LightBoxWrapper>
            <div className='ExportEquipmentData'>
                Hello World ExportEquipmentDataModal
                <button onClick={props.closeModal}>Close</button>
            </div>
        </LightBoxWrapper>
    );
};

export default ExportEquipmentDataModal;