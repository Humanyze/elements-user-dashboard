import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RouterPaths from 'RouterPaths';

import './action-sub-bar.scss';

import * as MODAL_CONFIGS from 'Src/components/modal/modalConfigs';
import { openModal } from 'Redux/modal/modalActions';
import { getSelectedDeploymentName } from 'Redux/deployment/deploymentReducer';
import { getCurrentTranslations } from 'Src/redux/language/languageReducer';


export const ActionSubBarPure = ({ openImportDialog, openExportDialog, deploymentName, translations }) => {
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
                <div onClick={openImportDialog} className='ActionSubBar__text'>
                    {translations.actionSubBar__export}
                </div>
            </div>
        </div>
    );
};

const ActionSubBar = connect(
    state => ({ deploymentName: getSelectedDeploymentName(state), translations: getCurrentTranslations(state) }),
    (dispatch) => ({
        openImportDialog: () => dispatch(openModal(MODAL_CONFIGS.importParticipantsConfig)),
        openExportDialog: () => dispatch(openModal(MODAL_CONFIGS.exportParticipantsConfig))
    })
)(ActionSubBarPure);

export default ActionSubBar;