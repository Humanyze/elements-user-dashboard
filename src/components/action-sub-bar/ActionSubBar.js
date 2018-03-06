import React from 'react';
import {connect} from 'react-redux';
import './action-sub-bar.scss';
import * as MODAL_CONFIGS from "../modal/modalConfigs";
import {openModal} from '../../redux/modal/modalActions';

const group = 'Humanyze internal';

const ActionSubBarPure = ({openImportDialog, openExportDialog}) => {
    return (
        <div className='ActionSubBar'>
            <div className='ActionSubBar__text'>
                Viewing Data For: {group}
            </div>
            <div className='ActionSubBar__text'>
                Change Deployment
            </div>
            {/*<div className='ActionSubBar__text' onClick={openImportDialog}>*/}
                {/*Import*/}
            {/*</div>*/}
            {/*<div className='ActionSubBar__text' onClick={openExportDialog}>*/}
                {/*Export*/}
            {/*</div>*/}
        </div>
    );
};


const ActionSubBar = connect(
    null,
    (dispatch) => ({
        openImportDialog: () => dispatch(openModal(MODAL_CONFIGS.importParticipantsConfig)),
        openExportDialog: () => dispatch(openModal(MODAL_CONFIGS.exportParticipantsConfig))
    })
)(ActionSubBarPure);

export default ActionSubBar;