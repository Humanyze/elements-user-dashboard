import React from 'react';
import {connect} from 'react-redux';
import './action-sub-bar.scss';
import * as MODAL_CONFIGS from "../modal/modalConfigs";
import {openModal} from '../../redux/modal/modalActions';
import {Link} from "react-router-dom";

const group = 'Humanyze internal';

const ActionSubBarPure = ({openImportDialog, openExportDialog}) => {
    return (
        <div className='ActionSubBar'>
            <div className='ActionSubBar__text'>
                Viewing Data For: {group}
            </div>

            {/* TODO to is incorrect path currently*/}
            <Link to={`/select-deployment`} className='ActionSubBar__text'>
                Change Deployment
            </Link>
        </div>
    )
};
// {/*<div className='ActionSubBar__text' onClick={openImportDialog}>*/}
// {/*Import*/}
// {/*</div>*/}
// {/*<div className='ActionSubBar__text' onClick={openExportDialog}>*/}
// {/*Export*/}
// {/*</div>*/}


const ActionSubBar = connect(
    null,
    (dispatch) => ({
        openImportDialog: () => dispatch(openModal(MODAL_CONFIGS.importParticipantsConfig)),
        openExportDialog: () => dispatch(openModal(MODAL_CONFIGS.exportParticipantsConfig))
    })
)(ActionSubBarPure);

export default ActionSubBar;