import React, {Component} from 'react';
import LightBoxWrapper from '../LightBoxWrapper/LightBoxWrapper';

class ImportEquipmentDataModal extends Component {
    state = {};


    render() {
        return (
            <LightBoxWrapper>
                <div className='ImportEquipmentData'>
                    Hello World ImportEquipmentDataModal
                    <button onClick={this.props.closeModal}>Close</button>
                </div>
            </LightBoxWrapper>
        );
    }
};

export default ImportEquipmentDataModal;