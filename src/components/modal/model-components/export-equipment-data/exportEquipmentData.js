import React, {Component} from 'react';
import LightBoxWrapper from '../LightBoxWrapper/LightBoxWrapper';

class ExportEquipmentDataModal extends Component {
    state = {};


    render() {
        return (
            <LightBoxWrapper>
                <div className='ExportEquipmentData'>
                    Hello World ExportEquipmentDataModal
                    <button onClick={this.props.closeModal}>Close</button>
                </div>
            </LightBoxWrapper>
        );
    }
};

export default ExportEquipmentDataModal;