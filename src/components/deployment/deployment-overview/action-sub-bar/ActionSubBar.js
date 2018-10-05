import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose, withHandlers, withState } from 'recompose';
import contentDisposition from 'content-disposition';
import RouterPaths from 'RouterPaths';
import * as R from 'ramda';
import FileDownload from 'js-file-download';
import classNames from 'classnames';

import './action-sub-bar.scss';

import ErrorMessages from 'Redux/common/error/errorMessageTypes';
import { addFlashErrorWithFadeout } from 'Redux/common/error/errorActions';

import * as MODAL_CONFIGS from 'Src/components/modal/modalConfigs';
import { openModal } from 'Redux/common/modal/modalActions';
import { getSelectedDeploymentName, getSelectedDeploymentStartDate } from 'Redux/common/deployment/deploymentReducer';
import { getCurrentTranslations } from 'Src/redux/common/language/languageReducer';
import AxiosRequestService from 'Src/redux/common/AxiosRequestService';
import { getSelectedDeploymentId } from 'Src/redux/common/deployment/deploymentReducer';
import { getBearerToken } from 'Src/redux/common/auth/authReducer';


const onExportClicked = ({ deploymentId, bearerToken, isExporting, setIsExporting, showExportError }) => async (e) => {
    if (isExporting) {
        // don't allow clicks while waiting for export response
        return;
    }
    setIsExporting(true);

    try {
        const res = await AxiosRequestService.datasets.getExportedParticipantsByDatasetId(deploymentId, bearerToken);
        const { parameters: { filename } } = contentDisposition.parse(`attachment; ${R.path(['headers', 'content-disposition'], res)}`);
        FileDownload(res.data, filename);
    } catch (e) {
        console.error(e);
        showExportError();
    }
    setIsExporting(false);
};

const onImportClicked = ({ hasDeploymentStartDate, openImportDialog, showImportStartDateError }) => () => {
    hasDeploymentStartDate ? openImportDialog() : showImportStartDateError();
};

const enhance = compose(
    withState('isExporting', 'setIsExporting', false),
    withHandlers({
        onImportClicked,
        onExportClicked
    }),
);

export const ActionSubBarPure = ({ onImportClicked, onExportClicked, isExporting, deploymentName, translations }) => {
    return (
        <div className='ActionSubBar'>
            <div className='ActionSubBar__section ActionSubBar__section-left'>
                <div className='ActionSubBar__text ActionSubBar__description'>
                    {/* TODO: Add skeleton box for when deployment name has not been set yet*/}
                    {translations.actionSubBar__viewingDataFor}: {deploymentName}
                </div>

                <Link to={RouterPaths.deploymentSelection} className='ActionSubBar__text'>
                    {translations.actionSubBar__changeDeployment}
                </Link>
            </div>

            <div className='ActionSubBar__section ActionSubBar__section-right'>
                <div onClick={onImportClicked} className='ActionSubBar__text'>
                    {translations.actionSubBar__import}
                </div>
                <div onClick={onExportClicked}
                     className={classNames('ActionSubBar__text', { 'ActionSubBar__text--exporting': isExporting })}>
                    {isExporting ? translations.actionSubBar__exporting : translations.actionSubBar__export}
                </div>
            </div>
        </div>
    );
};

const ActionSubBar = connect(
    state => ({
        deploymentName        : getSelectedDeploymentName(state),
        deploymentId          : getSelectedDeploymentId(state),
        hasDeploymentStartDate: !!getSelectedDeploymentStartDate(state),
        bearerToken           : getBearerToken(state),
        translations          : getCurrentTranslations(state)
    }),
    (dispatch) => ({
        openImportDialog        : () => dispatch(openModal(MODAL_CONFIGS.importParticipantsConfig)),
        showImportStartDateError: () => dispatch(addFlashErrorWithFadeout(ErrorMessages.noImportStartDateError)),
        showExportError         : () => dispatch(addFlashErrorWithFadeout(ErrorMessages.participantExportFailure))

    })
)(enhance(ActionSubBarPure));

export default ActionSubBar;