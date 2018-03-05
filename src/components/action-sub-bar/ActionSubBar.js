import React from 'react';
import {connect} from 'react-redux';
import './action-sub-bar.scss';
import MODAL_TYPES from "../modal/modalTypes";
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
            <div/>
            <div className='ActionSubBar__text' onClick={openImportDialog}>
                Import
            </div>
            <div className='ActionSubBar__text' onClick={openExportDialog}>
                Export
            </div>
        </div>
    );
};


const ActionSubBar = connect(
    null,
    (dispatch) => ({
        openImportDialog: () => dispatch(openModal(MODAL_TYPES.IMPORT_EQUIPMENT_MODAL)),
        openExportDialog: () => dispatch(openModal(MODAL_TYPES.EXPORT_EQUIPMENT_MODAL))
    })
)(ActionSubBarPure);

export default ActionSubBar;