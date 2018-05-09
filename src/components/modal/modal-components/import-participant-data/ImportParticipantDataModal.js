import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers, withPropsOnChange, withState } from 'recompose';
import MaterialIcon from 'material-icons-react';
import Moment from 'moment';

import generateErrorLog from 'Utils/generate-error-log';

import './import-participant-data-modal.scss';
import 'Src/Global.scss';

import LightBoxWrapper from '../LightBoxWrapper/LightBoxWrapper';


import AxiosRequestService from 'Src/redux/AxiosRequestService';


import { getBearerToken } from 'Src/redux/auth/authReducer';
import { getCurrentTranslations } from 'Redux/language/languageReducer';
import {
    getSelectedDeploymentName,
    getSelectedDeploymentStartDate,
    getSelectedDeploymentEndDate, getSelectedDeploymentId
} from 'Redux/deployment/deploymentReducer';

import DateSelector from 'Common/date-selector/dateSelector';
import FileUploadSelector from 'Common/file-upload-selector/fileUploadSelector';
import ImportWizard from 'Src/components/common/import-wizard/importWizard';
import ImportParticipantActionBlock from './import-participant-action-block/importParticipantActionBlock';


const acceptedFileTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
    'application/vnd.ms-excel.sheet.macroEnabled.12',
    'application/vnd.ms-excel.template.macroEnabled.12'
];


const stateTypes = {
    SELECTING       : 'SELECTING',
    VALIDATING      : 'VALIDATING',
    VALID           : 'VALID',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    IMPORTING       : 'IMPORTING',
    IMPORT_TOO_LONG : 'IMPORT_TOO_LONG',
    IMPORT_ERROR    : 'IMPORT_ERROR',
    IMPORT_SUCCESS  : 'IMPORT_SUCCESS'
};

const batchStateUpdater = (props) => (updateConfig) => {
    console.warn('fakeStateMachine', updateConfig);
    switch (updateConfig.type) {
        case stateTypes.SELECTING:
            props.setIsValidating(false);
            props.setIsValid(false);
            props.setParticipantError(null);
            props.setTeamError(null);
            props.setGenericError(null);
            props.setSuccessInfo(null);
            props.setIsImporting(false);

            // updates
            updateConfig.dataFile && props.setDataFile(updateConfig.dataFile);
            updateConfig.date && props.setEffectiveDate(updateConfig.date);
            break;
        case stateTypes.VALIDATING:
            // updates
            props.setIsValidating(true);

            props.setIsValid(false);
            props.setParticipantError(null);
            props.setTeamError(null);
            props.setGenericError(null);
            props.setSuccessInfo(null);
            props.setIsImporting(false);
            break;
        case stateTypes.VALID:
            props.setIsValidating(false);

            // updates
            props.setIsValid(true);
            props.setSuccessInfo({
                participantsToCreate: updateConfig.participantsToCreate,
                participantsToUpdate: updateConfig.participantsToUpdate
            });

            props.setParticipantError(null);
            props.setTeamError(null);
            props.setGenericError(null);

            props.setIsImporting(false);
            break;
        case stateTypes.VALIDATION_ERROR:
            props.setIsValidating(false);
            props.setIsValid(false);

            updateConfig.participantError && props.setParticipantError(updateConfig.participantError);
            updateConfig.teamError && props.setTeamError(updateConfig.teamError);
            updateConfig.genericError && props.setGenericError(updateConfig.genericError);

            props.setSuccessInfo(null);
            props.setIsImporting(false);
            break;
        case stateTypes.IMPORTING:
            props.setIsImporting(true);
            break;
        case stateTypes.IMPORT_TOO_LONG:
            props.setImportTooLong(true);
            break;
        case stateTypes.IMPORT_ERROR:
            props.setIsImporting(false);
            props.setImportTooLong(false);
            break;
        case stateTypes.IMPORT_SUCCESS:
            props.setImportComplete(true);
            props.setIsImporting(false);
            props.setImportInfo(updateConfig.importInfo);
            props.setImportTooLong(false);
            break;
        default:
            console.log('default');
    }

};


const onFileChange = ({ batchStateUpdater }) => ({ target }) => target.files[0] && batchStateUpdater({
    type    : stateTypes.SELECTING,
    dataFile: target.files[0]
});

const onDateChange = ({ setEffectiveDate }) => (date) => setEffectiveDate(date);

const onValidateClicked = ({
                               bearerToken, deploymentId, deploymentName,
                               dataFile, batchStateUpdater
                           }) => async (e) => {

    try {

        batchStateUpdater({ type: stateTypes.VALIDATING });

        const { data } = await AxiosRequestService.datasets.validateParticipantDataset(deploymentId, dataFile, bearerToken);

        const {
            'manager_teams_mapped_errors': teamErrors,
            'participants_errors'        : participantErrors,
            'participants_to_create'     : participantsToCreate,
            'participants_to_update'     : participantsToUpdate
        } = data;

        const hasTeamErrors = !!teamErrors.count;
        const hasParticipantErrors = !!participantErrors.count;

        const isFileValid = !hasTeamErrors && !hasParticipantErrors;

        if (isFileValid) {
            batchStateUpdater({
                type                : stateTypes.VALID,
                participantsToCreate: participantsToCreate.length,
                participantsToUpdate: participantsToUpdate.length
            });
        } else {
            batchStateUpdater({
                type            : stateTypes.VALIDATION_ERROR,
                participantError: hasParticipantErrors && { deploymentName, participantErrors },
                teamError       : hasTeamErrors && { deploymentName, teamErrors }
            });
        }

    } catch (e) {
        console.error(e);
        const { response } = e;
        const message = (response && response.data && response.data.message) || 'TODO ADD GENERIC MESSAGE';

        batchStateUpdater({
            type        : stateTypes.VALIDATION_ERROR,
            genericError: message
        });
    }
};

const onUploadClicked = ({ batchStateUpdater, monitorImportStatus, setRequestUUID, deploymentId, dataFile, effectiveDate, bearerToken }) => async () => {
    try {
        batchStateUpdater({ type: stateTypes.IMPORTING });

        const sanitizedEffectiveDate = Moment(effectiveDate).format('YYYY-MM-DD');
        const effectiveDateISO = `${sanitizedEffectiveDate}T00:00:00`;

        const res = await AxiosRequestService.datasets.uploadParticipantDataset(deploymentId, dataFile, effectiveDateISO, bearerToken);
        await setRequestUUID(res.data.task.uuid);
        monitorImportStatus(res.data.task.uuid);
    } catch (e) {
        console.error(e);
        batchStateUpdater({ type: stateTypes.IMPORT_ERROR });
    }

};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const monitorImportStatus = ({ batchStateUpdater, deploymentId, bearerToken }) => async (requestUUID) => {
    const TOO_LONG_LIMIT_SECONDS = 60;
    const startMoment = Moment();

    let result = false;
    
    while (!result) {
        const res = await AxiosRequestService.datasets.pollParticipantImportStatus(deploymentId, requestUUID, bearerToken);

        console.log('monitoring', res.data.state);

        if (res.data.state === 'SUCCESS') {

            batchStateUpdater({
                type      : stateTypes.IMPORT_SUCCESS,
                importInfo: res.data.result.participants
            });
            result = true;
        }
        else if (res.data.state === 'FAILURE') {
            batchStateUpdater({
                type: stateTypes.IMPORT_ERROR,
            });
            result = true;
        } else {
            if (Moment().diff(startMoment, 'seconds') > TOO_LONG_LIMIT_SECONDS) {
                batchStateUpdater({
                    type: stateTypes.IMPORT_TOO_LONG,
                });
            }
            await delay(1000);
        }
    }
};


const cancelImportClicked = ({ deploymentId, requestUUID, bearerToken }) => async () => {
    const res = await AxiosRequestService.datasets.cancelParticipantImport(deploymentId, requestUUID, bearerToken);
};


const onParticipantLogDownloadClicked = ({ participantError: { deploymentName, participantErrors } }) => () => {
    const log = generateErrorLog(deploymentName, participantErrors, 'Participants');
    log.save('errors-Participants.pdf');
};
const onTeamLogDownloadClicked = ({ teamError: { deploymentName, teamErrors } }) => () => {
    const log = generateErrorLog(deploymentName, teamErrors, 'Team Managed');
    log.save('errors-Team Managed.pdf');
};


const enhance = compose(
    withState('dataFile', 'setDataFile', null),
    withState('effectiveDate', 'setEffectiveDate', null),

    withState('isValidating', 'setIsValidating', false),
    withState('isValid', 'setIsValid', false),

    withState('successInfo', 'setSuccessInfo', null),

    withState('participantError', 'setParticipantError', null),
    withState('teamError', 'setTeamError', null),
    withState('genericError', 'setGenericError', null),
    withState('isImporting', 'setIsImporting', false),
    withState('importTooLong', 'setImportTooLong', false),
    withState('importError', 'setImportError', null),
    withState('importComplete', 'setImportComplete', false),
    withState('importInfo', 'setImportInfo', null),
    withState('requestUUID', 'setRequestUUID', null),

    withPropsOnChange(
        ['dataFile', 'is'],
        ({ dataFile }) => ({
            fileIsSelected: !!dataFile
        })
    ),
    withPropsOnChange(
        ['fileIsSelected', 'effectiveDate'],
        ({ fileIsSelected, effectiveDate }) => ({ fileState: ((fileIsSelected && effectiveDate) ? 'succeeded' : 'ready') })
    ),
    withHandlers({
        batchStateUpdater
    }),
    withHandlers({
        monitorImportStatus
    }),
    withHandlers({
        onFileChange,
        onDateChange,
        onValidateClicked,
        onUploadClicked,
        onParticipantLogDownloadClicked,
        onTeamLogDownloadClicked,
        cancelImportClicked
    }),
);


export const ImportEquipmentDataModalPure = ({
                                                 translations, closeModal,
                                                 deploymentName,

                                                 dataFile, fileIsSelected, onFileChange,
                                                 isImporting,

                                                 startDate, endDate, importTooLong,
                                                 effectiveDate, onDateChange,

                                                 fileState, isValidating, successInfo,
                                                 participantError, onParticipantLogDownloadClicked,
                                                 teamError, onTeamLogDownloadClicked,
                                                 genericError, isValid, importComplete,
                                                 cancelUploadClicked,
                                                 importInfo,
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
        onChange: onDateChange,
        startDate,
        endDate
    };

    return (
        <LightBoxWrapper>
            <div className={`ImportParticipantDataModal ${isValidating && 'validating'} ${isImporting && 'importing'}`}>

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
                        <ImportWizard fileState={fileState}
                                      validateState={isValid ? 'succeeded' : isValidating ? 'running' : 'ready'}
                                      importState={importComplete ? 'succeeded' : isImporting ? 'running' : 'ready'}/>
                    </div>


                    {/* FEEDBACK MESSAGES */}

                    <div className='ImportParticipantDataModal__feedback-block'>
                        {/* PARTICIPANT ERROR MESSAGE */}
                        {participantError &&
                        <ValidationError text={translations['ImportParticipantDataModal__participant-error']}
                                         buttonText={translations['ImportParticipantDataModal__view-errors']}
                                         onDownloadClicked={onParticipantLogDownloadClicked}/>}

                        {/* TEAM ERROR MESSAGE */}
                        {teamError &&
                        <ValidationError text={translations['ImportParticipantDataModal__team-error']}
                                         buttonText={translations['ImportParticipantDataModal__view-errors']}
                                         onDownloadClicked={onTeamLogDownloadClicked}/>}

                        {/* 4XX Errors */}
                        {genericError && <ValidationError text={genericError}/>}

                        {importTooLong && <ImportTooLongMessage cancelHandler={cancelUploadClicked}/>}

                        {importComplete && importInfo &&
                        <ImportSuccessMessage translations={translations} {...importInfo} />}

                        {/* SUCCESS MESSAGE */}
                        {!genericError && !teamError && !participantError && successInfo && !importComplete &&
                        <ValidationSuccessMessage translations={translations} {...successInfo}/>
                        }

                    </div>

                    {/* ACTION BUTTONS */}
                    <ImportParticipantActionBlock onCloseClicked={closeModal}
                                                  onValidateClicked={onValidateClicked}
                                                  onUploadClicked={onUploadClicked}
                                                  fileState={fileState}
                                                  isValid={isValid}
                                                  importComplete={importComplete}/>

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


const ValidationError = ({ text, buttonText, onDownloadClicked }) => {
    return (
        <div className='ValidationError'>{text}<span className='ValidationError__download-text'
                                                     onClick={onDownloadClicked}>{buttonText}</span></div>
    );
};

const ValidationSuccessMessage = ({ translations, participantsToCreate, participantsToUpdate }) => {
    return (
        <div className='ValidationSuccessMessage'>
            <div> {participantsToCreate} Participants to Create.</div>
            <div>{participantsToUpdate} Participants to Update.</div>
        </div>
    );
};

const ImportSuccessMessage = ({ translations, updated, created, unchanged }) => {
    return (
        <div className='ValidationSuccessMessage'>
            <div> {created} participants were created.</div>
            <div>{updated} participants were created.</div>
            <div>{unchanged} participants were unchanged.</div>
        </div>
    );
};

const ImportTooLongMessage = ({ translations, cancelHander }) => {
    return (
        <div className='ImportTooLongMessage'>
            <div>Your import is taking a long time and may not complete.</div>
            <div>Would you like to <span onClick={cancelHander}>cancel?</span></div>
        </div>
    );
};


