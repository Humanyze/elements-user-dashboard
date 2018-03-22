import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './action-sub-bar.scss';

import * as MODAL_CONFIGS from 'Src/components/modal/modalConfigs';
import { openModal } from 'Redux/modal/modalActions';
import { getSelectedDeployment } from 'Redux/deployment/deploymentReducer';


export const ActionSubBarPure = ({ openImportDialog, openExportDialog, deploymentName }) => {
    return (
        <div className='ActionSubBar'>
            <div className='ActionSubBar__text'>
                Viewing Data For: {deploymentName}
            </div>

            {/* TODO: to is incorrect path currently*/}
            <Link to={'/deployments/select-deployment'} className='ActionSubBar__text'>
                Change Deployment
            </Link>
            <div onClick={openImportDialog}  className='ActionSubBar__text'>
                Import
            </div>
            <div/>
        </div>
    );
};

const ActionSubBar = connect(
    state => ({ deploymentName: getSelectedDeployment(state).name }),
    (dispatch) => ({
        openImportDialog: () => dispatch(openModal(MODAL_CONFIGS.importParticipantsConfig)),
        openExportDialog: () => dispatch(openModal(MODAL_CONFIGS.exportParticipantsConfig))
    })
)(ActionSubBarPure);

export default ActionSubBar;