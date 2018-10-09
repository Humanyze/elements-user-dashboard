import React from 'react';
import LightBoxWrapper from '../LightBoxWrapper/LightBoxWrapper';

const ImportEquipmentDataModal = (props) => {
    return (
        <LightBoxWrapper>
            <div className='ImportEquipmentData'>
                <div>Hello World ImportEquipmentDataModal</div>
                <div>
                    <button onClick={props.closeModal}>Close</button>
                </div>
            </div>
        </LightBoxWrapper>
    );
};

export default ImportEquipmentDataModal;