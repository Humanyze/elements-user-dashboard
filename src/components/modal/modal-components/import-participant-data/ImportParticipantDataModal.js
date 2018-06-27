import React from 'react';
import { connect } from 'react-redux';
import { compose, flattenProp, lifecycle, withHandlers, withProps, withPropsOnChange, withState } from 'recompose';
import MaterialIcon from 'material-icons-react';
import Moment from 'moment';
import { isEmpty } from 'lodash';
import delay from 'Utils/delay';

import generateErrorLog from 'Utils/generate-error-log';
import inferFileTypeFromExtention, { fileTypeList as acceptedFileTypes } from 'Utils/infer-file-type-from-extension';

import './import-participant-data-modal.scss';
import 'Src/Global.scss';

import LightBoxWrapper from '../LightBoxWrapper/LightBoxWrapper';


import AxiosRequestService from 'Src/redux/AxiosRequestService';


import { getBearerToken } from 'Src/redux/common/auth/authReducer';
import { getCurrentTranslations } from 'Redux/common/language/languageReducer';

import {
    getSelectedDeploymentName,
    getSelectedDeploymentStartDate,
    getSelectedDeploymentEndDate,
    getSelectedDeploymentId
} from 'Redux/deployment/deploymentReducer';

import DateSelector from 'Common/date-selector/DateSelector';
import FileUploadSelector from 'Common/file-upload-selector/FileUploadSelector';
import ImportWizard from 'Src/components/common/import-wizard/ImportWizard';
import ImportParticipantActionBlock from './import-participant-action-block/ImportParticipantActionBlock';
import { requestParticipantsData } from 'Src/redux/participants/participantsActions';


const machineStateTypes = {
    INITIAL         : 'INITIAL',
    INVALID_FILE    : 'INVALID_FILE',
    VALIDATING      : 'VALIDATING',
    VALID           : 'VALID',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    IMPORTING       : 'IMPORTING',
    IMPORT_TOO_LONG : 'IMPORT_TOO_LONG',
    IMPORT_ERROR    : 'IMPORT_ERROR',
    IMPORT_SUCCESS  : 'IMPORT_SUCCESS'
};

const machineStates = {
    [machineStateTypes.INITIAL]         : {
        isInvalidFile : false,
        isValidating  : false,
        isValid       : false,
        isImporting   : false,
        importTooLong : false,
        importComplete: false
    },
    [machineStateTypes.INVALID_FILE]    : {
        isInvalidFile : true,
        isValidating  : false,
        isValid       : false,
        isImporting   : false,
        importTooLong : false,
        importComplete: false,

    },
    [machineStateTypes.VALIDATING]      : {
        isInvalidFile : false,
        isValidating  : true,
        isValid       : false,
        isImporting   : false,
        importTooLong : false,
        importComplete: false
    },
    [machineStateTypes.VALID]           : {
        isInvalidFile : false,
        isValidating  : false,
        isValid       : true,
        isImporting   : false,
        importTooLong : false,
        importComplete: false
    },
    [machineStateTypes.VALIDATION_ERROR]: {
        isInvalidFile : false,
        isValidating  : false,
        isValid       : false,
        isImporting   : false,
        importTooLong : false,
        importComplete: false
    },
    [machineStateTypes.IMPORTING]       : {
        isInvalidFile : false,
        isValidating  : false,
        isValid       : true,
        isImporting   : true,
        importTooLong : false,
        importComplete: false
    },
    [machineStateTypes.IMPORT_TOO_LONG] : {
        isInvalidFile : false,
        isValidating  : false,
        isValid       : true,
        isImporting   : true,
        importTooLong : true,
        importComplete: false
    },
    [machineStateTypes.IMPORT_ERROR]    : {
        isInvalidFile : false,
        isValidating  : false,
        isValid       : true,
        isImporting   : false,
        importTooLong : false,
        importComplete: false
    },
    [machineStateTypes.IMPORT_SUCCESS]  : {
        isInvalidFile : false,
        isValidating  : false,
        isValid       : true,
        isImporting   : true,
        importTooLong : false,
        importComplete: true
    }
};

const updateMachineState = (props) => (updateConfig) => {
    switch (updateConfig.type) {
        case machineStateTypes.INITIAL:
            updateConfig.dataFile && props.setDataFile(updateConfig.dataFile);
            props.setMachineStateType(machineStateTypes.INITIAL);
            props.setValidationInfo(null);
            props.setValidationErrors({});
            break;

        case machineStateTypes.INVALID_FILE:
            props.setMachineStateType(machineStateTypes.INVALID_FILE);
            props.setValidationInfo(null);
            props.setValidationErrors({});
            break;

        case machineStateTypes.VALIDATING:
            props.setMachineStateType(machineStateTypes.VALIDATING);
            break;

        case machineStateTypes.VALID:
            props.setMachineStateType(machineStateTypes.VALID);
            props.setValidationInfo({
                participantsToCreate: updateConfig.participantsToCreate,
                participantsToUpdate: updateConfig.participantsToUpdate
            });
            props.setValidationErrors({});
            break;

        case machineStateTypes.VALIDATION_ERROR:
            props.setMachineStateType(machineStateTypes.VALIDATION_ERROR);
            props.setValidationErrors(updateConfig.validationError);
            break;

        case machineStateTypes.IMPORTING:
            props.setMachineStateType(machineStateTypes.IMPORTING);
            break;

        case machineStateTypes.IMPORT_TOO_LONG:
            props.setMachineStateType(machineStateTypes.IMPORT_TOO_LONG);
            break;

        case machineStateTypes.IMPORT_ERROR:
            props.setMachineStateType(machineStateTypes.IMPORT_ERROR);
            props.setRequestUUID(null);
            props.setImportError(updateConfig.errorMessage);
            break;

        case machineStateTypes.IMPORT_SUCCESS:
            props.setMachineStateType(machineStateTypes.IMPORT_SUCCESS);
            props.setImportInfo(updateConfig.importInfo);
            props.setImportError(null);
            props.setRequestUUID(null);
            break;

        default:
            console.warn('Bad call to updateMachineState');
    }

};


const onFileChange = ({ updateMachineState }) => ({ target }) => {
    const file = target.files[0];
    console.warn('file uploading:', file);
    if (!file) return;

    const fileType = inferFileTypeFromExtention(file.name);
    const isValidFileType = acceptedFileTypes.includes(fileType);

    if (isValidFileType) {
        updateMachineState({
            type    : machineStateTypes.INITIAL,
            dataFile: target.files[0]
        });
    } else {
        updateMachineState({
            type: machineStateTypes.INVALID_FILE
        });
    }
};

const onDateChange = ({ setEffectiveDate }) => (date) => setEffectiveDate(date);

const onValidateClicked = ({ translations, bearerToken, deploymentId, deploymentName, dataFile, updateMachineState }) => async (e) => {
    try {

        updateMachineState({ type: machineStateTypes.VALIDATING });

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
            updateMachineState({
                type                : machineStateTypes.VALID,
                participantsToCreate: participantsToCreate.length,
                participantsToUpdate: participantsToUpdate.length
            });
        } else {
            updateMachineState({
                type           : machineStateTypes.VALIDATION_ERROR,
                validationError: {
                    participantError: hasParticipantErrors ? { deploymentName, participantErrors } : null,
                    teamError       : hasTeamErrors ? { deploymentName, teamErrors } : null
                }
            });
        }

    } catch (e) {
        console.error(e);

        const { response } = e;
        const message = (response && response.data && response.data.message) || translations['ValidationError__generic-error'];

        updateMachineState({
            type           : machineStateTypes.VALIDATION_ERROR,
            validationError: {
                genericError: message
            }
        });
    }
};

const onUploadClicked = ({ translations, updateMachineState, monitorImportStatus, setRequestUUID, deploymentId, dataFile, effectiveDate, bearerToken }) => async () => {
    try {
        updateMachineState({ type: machineStateTypes.IMPORTING });

        const sanitizedEffectiveDate = Moment(effectiveDate).format('YYYY-MM-DD');
        const effectiveDateISO = `${sanitizedEffectiveDate}T00:00:00`;

        const res = await AxiosRequestService.datasets.uploadParticipantDataset(deploymentId, dataFile, effectiveDateISO, bearerToken);
        await setRequestUUID(res.data.task.uuid);
        monitorImportStatus(res.data.task.uuid);
    } catch (e) {
        updateMachineState({
            type        : machineStateTypes.IMPORT_ERROR,
            errorMessage: translations['ImportError__generic-error']
        });
    }

};

const monitorImportStatus = ({ updateMachineState, deploymentId, bearerToken, requestParticipantsData, getRequestUUID }) => async () => {
    const TOO_LONG_LIMIT_SECONDS = 60;
    const startMoment = Moment();

    let hasResolved = false;
    let requestUUID = getRequestUUID();
    while (!hasResolved && requestUUID) {

        const res = await AxiosRequestService.datasets.pollParticipantImportStatus(deploymentId, requestUUID, bearerToken);

        console.log('Monitoring Import: ', res.data.state);

        if (res.data.state === 'SUCCESS') {

            updateMachineState({
                type      : machineStateTypes.IMPORT_SUCCESS,
                importInfo: res.data.result.participants
            });
            hasResolved = true;
            requestParticipantsData(deploymentId);
        }
        else if (res.data.state === 'FAILURE') {
            updateMachineState({
                type: machineStateTypes.IMPORT_ERROR,
            });
            hasResolved = true;
        } else {
            console.log(requestUUID);
            if (Moment().diff(startMoment, 'seconds') > TOO_LONG_LIMIT_SECONDS) {
                updateMachineState({
                    type: machineStateTypes.IMPORT_TOO_LONG,
                });
            }

            await delay(1000);
            requestUUID = getRequestUUID();
        }
    }
};


const cancelImportClicked = ({ deploymentId, requestUUID, bearerToken, setMachineStateType, setRequestUUID }) => async () => {
    try {
        await AxiosRequestService.datasets.cancelParticipantImport(deploymentId, requestUUID, bearerToken);
    } catch (e) {
        // happens if task completed while cancel was sent, weird race case
        console.log('Race Error', e);
    }
    setMachineStateType(machineStateTypes.VALID);
    setRequestUUID(null);
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

    withState('validationInfo', 'setValidationInfo', null),

    withState('validationErrors', 'setValidationErrors', {}),
    flattenProp('validationErrors'),
    withState('importError', 'setImportError', null),
    withState('importInfo', 'setImportInfo', null),
    withState('requestUUID', 'setRequestUUID', null),

    withState('machineStateType', 'setMachineStateType', machineStateTypes.INITIAL),
    withProps(({ machineStateType }) => machineStates[machineStateType]),
    withProps(({ startDateString, endDateString }) => ({
        startDate: Moment(startDateString),
        endDate  : Moment(endDateString)
    })),
    withPropsOnChange(
        ['dataFile'],
        ({ dataFile }) => ({ fileIsSelected: !!dataFile })
    ),
    withPropsOnChange(
        ['fileIsSelected', 'effectiveDate'],
        ({ fileIsSelected, effectiveDate }) => ({
            validationReady: !!(fileIsSelected && effectiveDate)
        })
    ),
    withHandlers({
        updateMachineState,
        getRequestUUID: ({ requestUUID }) => () => requestUUID
    }),
    withHandlers({
        monitorImportStatus,
    }),
    withHandlers({
        onFileChange,
        onDateChange,
        onValidateClicked,
        onUploadClicked,
        onParticipantLogDownloadClicked,
        onTeamLogDownloadClicked,
        cancelImportClicked,
    }),
    lifecycle({
        componentWillUnmount() {
            this.props.requestUUID && AxiosRequestService.datasets.cancelParticipantImport(this.props.deploymentId, this.props.requestUUID, this.props.bearerToken);
        }
    })
);


export const ImportEquipmentDataModalPure = ({
                                                 translations, closeModal,
                                                 deploymentName,

                                                 dataFile, fileIsSelected, onFileChange,
                                                 validationErrors, isInvalidFile,

                                                 startDate, endDate,
                                                 effectiveDate, onDateChange,

                                                 validationReady, isValidating, isValid, validationInfo,

                                                 participantError, onParticipantLogDownloadClicked,
                                                 teamError, onTeamLogDownloadClicked,
                                                 genericError,

                                                 isImporting,
                                                 importInfo, importTooLong, importError,
                                                 importComplete,
                                                 cancelImportClicked,

                                                 onValidateClicked, onUploadClicked,
                                             }) => {

    const FileUploadProps = {
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

    const importWizardProps = {
        validationReady,
        isValidating,
        isValid,
        isImporting,
        importComplete
    };

    return (
        <LightBoxWrapper>
            <div
                className={`ImportParticipantDataModal ${isValidating && 'validating'} ${isImporting && 'importing'} ${importComplete && 'importComplete'}`}>

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

                            <FileUploadSelector {...FileUploadProps}/>
                        </div>


                        <div className='ImportParticipantDataModal__date-block'>
                            <div>{translations['ImportParticipantDataModal__effective-date']}:</div>
                            <DateSelector {...dateSelectorProps}/>
                        </div>
                    </div>

                    {/* PROGRESS INDICATORS */}

                    <div className='ImportParticipantDataModal__import-wizard-wrapper'>
                        <ImportWizard {...importWizardProps} />
                    </div>


                    {/* FEEDBACK MESSAGES */}

                    <div className='ImportParticipantDataModal__feedback-block'>

                        {isInvalidFile &&
                        <GenericError text={translations['ImportParticipantDataModal__invalid-file-error']}/>}

                        {(participantError || teamError) &&
                        <div className='ValidationError__wrapper'>
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
                        </div>
                        }
                        {/* 4XX Errors */}
                        {genericError && <GenericError text={genericError}/>}


                        {/* FINAL INFO */}
                        {importComplete && <ImportSuccessMessage translations={translations} {...importInfo} />}

                        {/* TOO LONG SPACING DIV */}
                        {(importTooLong || importError) && <div/>}

                        {/* SUCCESS MESSAGE */}
                        {isEmpty(validationErrors) && validationInfo && !importComplete &&
                        <ValidationSuccessMessage translations={translations} {...validationInfo}/>
                        }

                        {importTooLong && !importError && <ImportTooLongMessage cancelHandler={cancelImportClicked}/>}
                        {importError && <ImportErrorMessage text={importError}/>}

                    </div>

                    {/* ACTION BUTTONS */}
                    <ImportParticipantActionBlock onCloseClicked={closeModal}
                                                  onValidateClicked={onValidateClicked}
                                                  onUploadClicked={onUploadClicked}
                                                  validationReady={validationReady}
                                                  isValid={isValid}
                                                  importComplete={importComplete}/>

                </div>

                {/* STATIC FOOTER */}
                <div className='ImportParticipantDataModal__footer-section'>
                    {deploymentName}
                </div>
            </div>
        </LightBoxWrapper>
    );
};


const ImportEquipmentDataModal = connect(
    state => ({
        translations   : getCurrentTranslations(state),
        bearerToken    : getBearerToken(state),
        deploymentName : getSelectedDeploymentName(state),
        deploymentId   : getSelectedDeploymentId(state),
        startDateString: getSelectedDeploymentStartDate(state),
        endDateString  : getSelectedDeploymentEndDate(state),
    }),
    { requestParticipantsData },
)(enhance(ImportEquipmentDataModalPure));


export default ImportEquipmentDataModal;


const ValidationError = ({ text, buttonText, onDownloadClicked }) => {
    return (
        <div className='ValidationError'>{text}<span className='ValidationError__download-text'
                                                     onClick={onDownloadClicked}>{buttonText}</span></div>
    );
};

const GenericError = ({ text }) => {
    return <div className='ValidationError'>{text}</div>;
};

const ValidationSuccessMessage = ({ translations, participantsToCreate, participantsToUpdate }) => {
    return (
        <div className='ValidationSuccessMessage'>
            <div> {participantsToCreate} {translations['ValidationSuccess__participants-create']}</div>
            <div>{participantsToUpdate} {translations['ValidationSuccess__participants-update']}</div>
        </div>
    );
};

const ImportSuccessMessage = ({ translations, updated, created, unchanged }) => {
    return (
        <div className='ValidationSuccessMessage'>
            <div> {created} {translations['ImportSuccess__participants-created']}</div>
            <div>{updated} {translations['ImportSuccess__participants-updated']}</div>
            <div>{unchanged} {translations['ImportSuccess__participants-unchanged']}</div>
        </div>
    );
};

const ImportErrorMessage = ({ translations, text }) => {
    return <div className='ImportErrorMessage'>{text}</div>;
};

const ImportTooLongMessage = ({ translations, cancelHandler }) => {
    return (
        <div className='ImportTooLongMessage'>
            <div>
                <div>{translations['ImportTooLong__message-one']}</div>
                <div>{translations['ImportTooLong__message-two']} <span onClick={cancelHandler}
                                                                        className='ImportTooLongMessage__cancel'>{translations['ImportTooLong__cancel-question']}</span>
                </div>
            </div>
        </div>
    );
};


