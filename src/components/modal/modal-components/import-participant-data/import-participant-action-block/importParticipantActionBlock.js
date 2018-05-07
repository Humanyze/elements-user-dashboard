import React from 'react';
import ActionButton from 'Src/components/modal/modal-components/import-participant-data/action-button/actionButton';
import { getCurrentTranslations } from 'Src/redux/language/languageReducer';
import { connect } from 'react-redux';
import { compose, withPropsOnChange } from 'recompose';


const enhance = compose(
    withPropsOnChange(
        ['fileState'],
        ({ fileState }) => {
            console.log(fileState);
            return ({
                validateVisible : fileState === 'added' || true,
                validateDisabled: fileState !== 'succeeded'
            });
        }
    )
);


const ImportParticipantActionBlockPure = ({ translations,
                                              onCloseClicked, onValidateClicked, onUploadClicked,
                                              validateVisible, validateDisabled,
                                              fileState, validateState }) => {
    console.log(fileState);
    return (
        <div className='ImportParticipantDataModal__action-buttons'>

            {/* REPLACE WITH TRANSLATION INTERP */}
            <ActionButton text={translations['close']} onClick={onCloseClicked}/>

            {validateVisible &&
            <ActionButton text={translations['ImportParticipantDataModal__validate']}
                          onClick={onValidateClicked}
                          disabled={validateDisabled}/>
            }

            {false &&
            <ActionButton text={translations['ImportParticipantDataModal__upload']}
                          onClick={onUploadClicked}
                          disabled={false}/>}
        </div>
    );
};

const ImportParticipantActionBlock = connect(
    state => ({ translations: getCurrentTranslations(state) })
)(enhance(ImportParticipantActionBlockPure));


export default ImportParticipantActionBlock;