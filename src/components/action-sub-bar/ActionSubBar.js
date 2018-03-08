import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

import './action-sub-bar.scss';

import * as MODAL_CONFIGS from "../modal/modalConfigs";
import {openModal} from '../../redux/modal/modalActions';
import {getSelectedDeployment} from "../../redux/deployment/deploymentReducer";


const ActionSubBarPure = ({openImportDialog, openExportDialog, deploymentName}) => {
    return (
        <div className='ActionSubBar'>
            <div className='ActionSubBar__text'>
                Viewing Data For: {deploymentName}
            </div>

            {/* TODO to is incorrect path currently*/}
            <Link to={`/deployments/select-deployment`} className='ActionSubBar__text'>
                Change Deployment
            </Link>
        </div>
    )
};

const ActionSubBar = connect(
    state => ({deploymentName: getSelectedDeployment(state).name}),
    (dispatch) => ({
        openImportDialog: () => dispatch(openModal(MODAL_CONFIGS.importParticipantsConfig)),
        openExportDialog: () => dispatch(openModal(MODAL_CONFIGS.exportParticipantsConfig))
    })
)(ActionSubBarPure);

export default ActionSubBar;