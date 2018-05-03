import React from 'react';
import { connect } from 'react-redux';
import { getCurrentTranslations } from 'Redux/language/languageReducer';
import MaterialIcon from 'material-icons-react';

import './file-upload-selector.scss';


export const FileUploadSelectorPure = ({ translations, fileIsSelected, fileName, onFileChange, acceptedFileTypes }) => {
    return (
        <div className='FileUploadSelector'>
            <label htmlFor='fileUploadInput' className='FileUploadSelector__label'>
                <input type='file'
                       id='fileUploadInput'
                       className='FileUploadSelector__file-input'
                       accept={acceptedFileTypes.join(',')}
                       onChange={onFileChange}/>
                <div className='FileUploadSelector__text-wrapper'>
                    {fileIsSelected ?
                        <div className='FileUploadSelector__file-name'>{fileName}</div>:
                        <div className='FileUploadSelector__select-file'>{translations['FileUploadSelector__select-file']}</div>
                    }
                    <MaterialIcon icon='search' size={18}/>
                </div>
            </label>
        </div>
    );
};


const FileUploadSelector = connect(
    state => ({
        translations: getCurrentTranslations(state),
    }),
)(FileUploadSelectorPure);


export default FileUploadSelector;