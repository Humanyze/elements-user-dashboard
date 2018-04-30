import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose, withHandlers, withState } from 'recompose';
import contentDisposition from 'content-disposition';
import RouterPaths from 'RouterPaths';
import * as R from 'ramda';
import fileDownload from 'js-file-download';

import './action-sub-bar.scss';

import ErrorMessages from 'Redux/error/errorMessageTypes';
import { addFlashErrorWithFadout } from 'Redux/error/errorActions';

import * as MODAL_CONFIGS from 'Src/components/modal/modalConfigs';
import { openModal } from 'Redux/modal/modalActions';
import { getSelectedDeploymentName } from 'Redux/deployment/deploymentReducer';
import { getCurrentTranslations } from 'Src/redux/language/languageReducer';
import AxiosRequestService from 'Src/redux/AxiosRequestService';
import { getSelectedDeploymentId } from 'Src/redux/deployment/deploymentReducer';
import { getBearerToken } from 'Src/redux/auth/authReducer';




const onExportClicked = ({ deploymentId, bearerToken, setIsExporting, showExportError }) => async (e) => {
    setIsExporting(true);

    try {
        const res = await AxiosRequestService.participants.getExportedParticipantsByDatasetId(deploymentId, bearerToken);
        const { parameters: { filename } } = contentDisposition.parse(`attachment; ${R.path(['headers', 'content-disposition'], res)}`);

        fileDownload(res.data, filename);

    } catch (e) {
        console.error(e);
        showExportError();
    }
    setIsExporting(false);
};


const enhance = compose(
    withState('isExporting', 'setIsExporting', false),
    withHandlers({
        onExportClicked
    })
);

export const ActionSubBarPure = ({ openImportDialog, onExportClicked, isExporting, deploymentName, translations }) => {
    return (
        <div className='ActionSubBar'>
            <div className='ActionSubBar__section ActionSubBar__section-left'>
                <div className='ActionSubBar__text ActionSubBar__description'>
                    {translations.actionSubBar__viewingDataFor}: {deploymentName}
                </div>

                <Link to={RouterPaths.deploymentSelection} className='ActionSubBar__text'>
                    {translations.actionSubBar__changeDeployment}
                </Link>
            </div>

            <div className='ActionSubBar__section ActionSubBar__section-right'>
                <div onClick={openImportDialog} className='ActionSubBar__text'>
                    {translations.actionSubBar__import}
                </div>
                <div onClick={onExportClicked} className='ActionSubBar__text'>
                    {isExporting ? translations.actionSubBar__exporting : translations.actionSubBar__export}
                </div>
            </div>
        </div>
    );
};

const ActionSubBar = connect(
    state => ({
        deploymentName: getSelectedDeploymentName(state),
        deploymentId: getSelectedDeploymentId(state),
        bearerToken: getBearerToken(state),
        translations: getCurrentTranslations(state)
    }),
    (dispatch) => ({
        openImportDialog: () => dispatch(openModal(MODAL_CONFIGS.importParticipantsConfig)),
        showExportError: () => dispatch(addFlashErrorWithFadout(ErrorMessages.participantExportFailure))

    })
)(enhance(ActionSubBarPure));

export default ActionSubBar;