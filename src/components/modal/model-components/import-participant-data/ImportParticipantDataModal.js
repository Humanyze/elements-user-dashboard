import React from 'react';
import { connect } from 'react-redux';
import { compose, withState } from 'recompose';
import MaterialIcon from 'material-icons-react';

import LightBoxWrapper from '../LightBoxWrapper/LightBoxWrapper';

import './import-participant-data-modal.scss';
import 'Src/Global.scss';

import { getCurrentTranslations } from 'Redux/language/languageReducer';
import { getSelectedDeploymentName } from 'Redux/deployment/deploymentReducer';
import DateSelector from 'Common/date-selector/dateSelector';
import FileUploadSelector from 'Common/file-upload-selector/fileUploadSelector';
import ActionButton from './action-button/actionButton';
import ImportWizard from 'Src/components/common/import-wizard/importWizard';


const enhance = compose(
    withState('fale', 'fdsadfdsa', false)
);


export const ImportEquipmentDataModalPure = ({ deploymentName, translations, closeModal }) => {
    return (
        <LightBoxWrapper>
            <div className='ImportParticipantDataModal'>

                {/* STATIC HEADER */}
                <div className='ImportParticipantDataModal__header-section'>
                    <div
                        className='ImportParticipantDataModal__header-text'>{translations['ImportParticipantDataModal__header']}</div>
                    <div onClick={closeModal} className='ImportParticipantDataModal__close-icon'>
                        <MaterialIcon icon='close' color='white' size={18}/>

                    </div>
                </div>

                <div className='ImportParticipantDataModal__body'>

                    {/* INPUT FIELDS */}
                    <div>
                        <div className='ImportParticipantDataModal__file-upload-block'>
                            <div>{translations['ImportParticipantDataModal__file']}:</div>
                            <FileUploadSelector/>
                        </div>


                        <div className='ImportParticipantDataModal__date-block'>
                            <div>{translations['ImportParticipantDataModal__effective-date']}:</div>
                            <DateSelector/>
                        </div>
                    </div>

                    {/* PROGRESS INDICATORS */}

                    <div className='ImportParticipantDataModal__import-wizard-wrapper'>
                        <ImportWizard/>
                    </div>


                    {/* FEEDBACK MESSAGES */}

                    <div className='ImportParticipantDataModal__feedback-block'>

                    </div>

                    {/* ACTION BUTTONS */}
                    <div className='ImportParticipantDataModal__action-buttons'>

                        {/* REPLACE WITH TRANSLATION INTERP */}
                        <ActionButton text={'Close'}/>

                        {true && <ActionButton text={'Validate'} disabled={true}/>}

                        {false && <ActionButton text={'Upload'}/>}
                    </div>


                </div>

                {/* STATIC FOOTER */}
                <div className='ImportParticipantDataModal__footer-section'>
                    {translations['ImportParticipantDataModal__footer-deployment']}
                    {deploymentName}
                </div>
            </div>
        </LightBoxWrapper>
    );
};


const ImportEquipmentDataModal = connect(
    state => ({
        translations  : getCurrentTranslations(state),
        deploymentName: getSelectedDeploymentName(state),

    }),
)(enhance(ImportEquipmentDataModalPure));


export default ImportEquipmentDataModal;


