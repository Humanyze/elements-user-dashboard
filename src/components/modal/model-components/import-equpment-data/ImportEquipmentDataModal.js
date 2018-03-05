import React, {Component} from 'react';
import LightBoxWrapper from '../LightBoxWrapper/LightBoxWrapper';

class ImportEquipmentDataModal extends Component {
    state = {};


    render() {
        return (
            <LightBoxWrapper>
                <div className='ImportEquipmentData'>
                    <div>Hello World ImportEquipmentDataModal</div>
                    <div>
                        <button onClick={this.props.closeModal}>Close</button>
                    </div>
                </div>
            </LightBoxWrapper>
        );
    }
};

export default ImportEquipmentDataModal;