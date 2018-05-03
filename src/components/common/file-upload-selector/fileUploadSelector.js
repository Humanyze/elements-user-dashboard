import React from 'react';
import { connect } from 'react-redux';
import { getCurrentTranslations } from 'Redux/language/languageReducer';
import MaterialIcon from 'material-icons-react';

import './file-upload-selector.scss';


const FileUploadSelectorPure = ({ translations }) => {
    return (
        <div className='FileUploadSelector'>
            {/* TODO: add logic for when file is given */}
            <div>{translations['FileUploadSelector__select-file']}</div>
            <MaterialIcon icon='search' size={18}/>
        </div>
    );
};


const FileUploadSelector = connect(
    state => ({
        translations: getCurrentTranslations(state),
    }),
)(FileUploadSelectorPure);


export default FileUploadSelector;