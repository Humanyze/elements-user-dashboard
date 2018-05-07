import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers, withPropsOnChange, withState } from 'recompose';
import MaterialIcon from 'material-icons-react';
import Moment from 'moment';


import LightBoxWrapper from '../LightBoxWrapper/LightBoxWrapper';

import './import-participant-data-modal.scss';
import 'Src/Global.scss';

import { getCurrentTranslations } from 'Redux/language/languageReducer';
import {
    getSelectedDeploymentName,
    getSelectedDeploymentStartDate,
    getSelectedDeploymentEndDate, getSelectedDeploymentId
} from 'Redux/deployment/deploymentReducer';
import DateSelector from 'Common/date-selector/dateSelector';
import FileUploadSelector from 'Common/file-upload-selector/fileUploadSelector';
import ImportParticipantActionBlock from './import-participant-action-block/importParticipantActionBlock';
import ImportWizard from 'Src/components/common/import-wizard/importWizard';
import AxiosRequestService from 'Src/redux/AxiosRequestService';
import { getBearerToken } from 'Src/redux/auth/authReducer';
import generateErrorLog from 'Utils/generate-error-log';


const acceptedFileTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
    'application/vnd.ms-excel.sheet.macroEnabled.12',
    'application/vnd.ms-excel.template.macroEnabled.12'
];

const ValidationError = ({ }) => {
    return (
        <div>Hello world</div>
    )
};


const ERRORS = {
    VALIDATE_ERROR: {
        type: 'VALIDATE_ERROR',
        component: ValidationError
    },

};

const onFileChange = ({ setDataFile }) => ({ target }) => target.files[0] && setDataFile(target.files[0]);

const onDateChange = ({ setEffectiveDate }) => (date) => setEffectiveDate(date);

const onValidateClicked = ({ bearerToken, deploymentId, deploymentName, dataFile, setErrorLog, setErrorState }) => async (e) => {
    try {
        const res = await AxiosRequestService.datasets.validateParticipantDataset(deploymentId, dataFile, bearerToken);

        let {
            data
        } = res;

        console.log(data);

        let {
            'manager_teams_mapped_errors': teamErrors,
            'participants_errors'        : participantErrors,
            'participants_to_create'     : participantsToCreate,
            'participants_to_update'     : participantsToUpdate
        } = data;

        const hasNoTeamErrors = !teamErrors.count;
        const hasNoParticipantErrors = !participantErrors.count;

        const isFileValid = hasNoTeamErrors && hasNoParticipantErrors;
        if (isFileValid) {
            console.log('valid file');
        } else {
            console.log('invalid', data);

            const log = generateErrorLog(deploymentName, participantErrors, 'Participants');
            setErrorLog(log);
            setErrorState({
                ...ERRORS.VALIDATE_ERROR
            });
            log.save('error.pdf'); // todo: remove

        }

    } catch (e) {
        // 4xx Error Paths
        console.warn(e);
    }
};

const onUploadClicked = ({}) => e => {

};


const enhance = compose(
    withState('dataFile', 'setDataFile', null),
    withState('errorState', 'setErrorState', {}),
    withState('errorLog', 'setErrorLog', null),
    withState('effectiveDate', 'setEffectiveDate', null),
    withPropsOnChange(
        ['dataFile'],
        ({ dataFile }) => ({
            fileIsSelected: !!dataFile
        })
    ),
    withPropsOnChange(
        ['fileIsSelected', 'effectiveDate'],
        ({ fileIsSelected, effectiveDate }) => ({ fileState: ((fileIsSelected && effectiveDate) ? 'succeeded' : 'ready') })
    ),
    withHandlers({
        onFileChange,
        onDateChange,
        onValidateClicked,
        onUploadClicked
    })
);


export const ImportEquipmentDataModalPure = ({
                                                 deploymentName, translations, closeModal,
                                                 dataFile, fileIsSelected, onFileChange,
                                                 startDate, endDate,
                                                 fileState, errorState,
                                                 effectiveDate, onDateChange,
                                                 onValidateClicked, onUploadClicked
                                             }) => {

    const fileUploadProps = {
        fileName: dataFile && dataFile.name,
        fileIsSelected,
        onFileChange,
        acceptedFileTypes
    };

    const dateSelectorProps = {
        date    : effectiveDate,
        startDate,
        endDate,
        onChange: onDateChange
    };

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

                            <FileUploadSelector {...fileUploadProps}/>
                        </div>


                        <div className='ImportParticipantDataModal__date-block'>
                            <div>{translations['ImportParticipantDataModal__effective-date']}:</div>
                            <DateSelector {...dateSelectorProps}/>
                        </div>
                    </div>

                    {/* PROGRESS INDICATORS */}

                    <div className='ImportParticipantDataModal__import-wizard-wrapper'>
                        <ImportWizard fileState={fileState}/>
                    </div>


                    {/* FEEDBACK MESSAGES */}

                    <div className='ImportParticipantDataModal__feedback-block'>
                        {errorState.component && errorState.component()}
                    </div>

                    {/* ACTION BUTTONS */}
                    <ImportParticipantActionBlock onCloseClicked={closeModal}
                                                  onValidateClicked={onValidateClicked}
                                                  onUploadClicked={onUploadClicked}
                                                  fileState={fileState}/>

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
        bearerToken   : getBearerToken(state),
        deploymentName: getSelectedDeploymentName(state),
        deploymentId  : getSelectedDeploymentId(state),
        startDate     : Moment(getSelectedDeploymentStartDate(state)),
        endDate       : Moment(getSelectedDeploymentEndDate(state))

    }),
)(enhance(ImportEquipmentDataModalPure));


export default ImportEquipmentDataModal;


