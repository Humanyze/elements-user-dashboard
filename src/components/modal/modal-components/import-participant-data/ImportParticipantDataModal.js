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

const ValidationError = ({ text, buttonText, onDownloadClicked }) => {
    return (
        <div className='ValidationError'>{text}<span className='ValidationError__download-text'
                                                     onClick={onDownloadClicked}>{buttonText}</span></div>
    );
};

const onFileChange = ({ setDataFile }) => ({ target }) => target.files[0] && setDataFile(target.files[0]);

const onDateChange = ({ setEffectiveDate }) => (date) => setEffectiveDate(date);

const onValidateClicked = ({ bearerToken, deploymentId, deploymentName, dataFile, setIsValidating, setErrorLog, setParticipantErrorState, setTeamErrorState, setGenericError }) => async (e) => {

    try {
        setIsValidating(true);
        const { data } = await AxiosRequestService.datasets.validateParticipantDataset(deploymentId, dataFile, bearerToken);

        const {
            'manager_teams_mapped_errors': teamErrors,
            'participants_errors'        : participantErrors,
            'participants_to_create'     : participantsToCreate,
            'participants_to_update'     : participantsToUpdate
        } = data;

        const hasNoTeamErrors = !teamErrors.count;
        const hasNoParticipantErrors = !participantErrors.count;

        const isFileValid = hasNoTeamErrors && hasNoParticipantErrors;
        if (isFileValid) {
            setParticipantErrorState({});
            setTeamErrorState({});
            setGenericError(null);
        } else {
            !!participantErrors.count && setParticipantErrorState({
                deploymentName,
                participantErrors,
            });

            !!teamErrors.count && setTeamErrorState({
                deploymentName,
                teamErrors
            });
        }

    } catch (e) {
        const { response } = e;
        const message = response.data && response.data.message;
        // 4xx Error Paths
        console.error(response);
        setGenericError(message);
    }
    setIsValidating(false);
};

const onUploadClicked = ({}) => e => {

};

const onParticipantLogDownloadClicked = ({ participantErrorState: { deploymentName, participantErrors } }) => () => {
    const log = generateErrorLog(deploymentName, participantErrors, 'Participants');
    log.save('errors-Participants.pdf');
};


const onTeamLogDownloadClicked = ({ teamErrorState: { deploymentName, teamErrors } }) => () => {
    const log = generateErrorLog(deploymentName, teamErrors, 'Team Managed');
    log.save('errors-Team Managed.pdf');
};


const enhance = compose(
    withState('dataFile', 'setDataFile', null),
    withState('effectiveDate', 'setEffectiveDate', null),

    withState('isValidating', 'setIsValidating', false),
    withState('isValid', 'setIsValid', false),

    withState('participantErrorState', 'setParticipantErrorState', {}),
    withState('teamErrorState', 'setTeamErrorState', {}),
    withState('genericError', 'setGenericError', null),

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
        onUploadClicked,
        onParticipantLogDownloadClicked,
        onTeamLogDownloadClicked
    })
);


export const ImportEquipmentDataModalPure = ({
                                                 translations, closeModal,
                                                 deploymentName,

                                                 dataFile, fileIsSelected, onFileChange,

                                                 startDate, endDate,
                                                 effectiveDate, onDateChange,

                                                 fileState, isValidating,
                                                 participantErrorState, onParticipantLogDownloadClicked,
                                                 teamErrorState, onTeamLogDownloadClicked,
                                                 genericError,

                                                 onValidateClicked, onUploadClicked,
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
            <div className={`ImportParticipantDataModal ${'fdsa'}`}>

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
                        <ImportWizard fileState={fileState} validateState={isValidating ? 'running': 'ready'} importState={fileState}/>
                    </div>


                    {/* FEEDBACK MESSAGES */}

                    <div className='ImportParticipantDataModal__feedback-block'>
                        {/* PARTICIPANT ERROR MESSAGE */}
                        {participantErrorState.deploymentName &&
                        <ValidationError text={translations['ImportParticipantDataModal__participant-error']}
                                         buttonText={translations['ImportParticipantDataModal__view-errors']}
                                         onDownloadClicked={onParticipantLogDownloadClicked}/>}

                        {/* TEAM ERROR MESSAGE */}
                        {teamErrorState.deploymentName &&
                        <ValidationError text={translations['ImportParticipantDataModal__team-error']}
                                         buttonText={translations['ImportParticipantDataModal__view-errors']}
                                         onDownloadClicked={onTeamLogDownloadClicked}/>}

                        {/* 4XX Errors */}
                        {genericError && <ValidationError text={genericError}/>}
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


