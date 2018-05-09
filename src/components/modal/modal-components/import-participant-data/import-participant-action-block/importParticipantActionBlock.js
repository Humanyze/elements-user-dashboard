import React from 'react';
import ActionButton from 'Src/components/modal/modal-components/import-participant-data/action-button/actionButton';
import { getCurrentTranslations } from 'Src/redux/language/languageReducer';
import { connect } from 'react-redux';
import { compose, withPropsOnChange } from 'recompose';


const enhance = compose(
    withPropsOnChange(
        ['fileState', 'isValid'],
        ({ fileState, isValid }) => {
            console.log(fileState, isValid);
            return ({
                validateVisible : !isValid,
                validateDisabled: fileState !== 'succeeded'
            });
        }
    )
);


const ImportParticipantActionBlockPure = ({ translations,
                                              onCloseClicked, onValidateClicked, onUploadClicked,
                                              validateVisible, validateDisabled,
                                              isValid, importComplete }) => {
    // console.log(fileState);
    return (
        <div className='ImportParticipantDataModal__action-buttons'>

            <ActionButton text={translations['close']} onClick={onCloseClicked}/>

            {!isValid &&
            <ActionButton text={translations['ImportParticipantDataModal__validate']}
                          theme={'blue ActionButton__validate'}
                          onClick={onValidateClicked}
                          disabled={validateDisabled}/>
            }

            {isValid && !importComplete &&
            <ActionButton text={translations['ImportParticipantDataModal__import']}
                          theme={'blue ActionButton__import'}
                          onClick={onUploadClicked}
                          disabled={false}/>}
        </div>
    );
};

const ImportParticipantActionBlock = connect(
    state => ({ translations: getCurrentTranslations(state) })
)(enhance(ImportParticipantActionBlockPure));


export default ImportParticipantActionBlock;