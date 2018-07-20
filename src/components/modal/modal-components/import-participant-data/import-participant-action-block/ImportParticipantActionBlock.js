import React from 'react';
import { connect } from 'react-redux';
import ActionButton from 'Src/components/modal/modal-components/import-participant-data/action-button/ActionButton';
import { getCurrentTranslations } from 'Src/redux/common/language/languageReducer';

const ImportParticipantActionBlockPure = ({ translations,
                                              onCloseClicked, onValidateClicked, onUploadClicked,
                                              validationReady, isValid, importComplete }) => {
    return (
        <div className='ImportParticipantDataModal__action-buttons'>

            <ActionButton text={translations['close']} onClick={onCloseClicked}/>

            {!isValid &&
            <ActionButton text={translations['ImportParticipantDataModal__validate']}
                          theme={'blue ActionButton__validate'}
                          onClick={onValidateClicked}
                          disabled={!validationReady}/>
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
)(ImportParticipantActionBlockPure);


export default ImportParticipantActionBlock;