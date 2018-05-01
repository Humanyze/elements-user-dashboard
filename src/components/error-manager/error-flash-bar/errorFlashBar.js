import React from 'react';
import { connect } from 'react-redux';
import MaterialIcon from 'material-icons-react';


import './error-flash-bar.scss';
import { removeFlashErrorById } from 'Src/redux/error/errorActions';
import { compose, withHandlers } from 'recompose';
import { getCurrentTranslations } from 'Src/redux/language/languageReducer';


const enhance = compose(
    withHandlers({
        dismissError: ({ dismissErrorWithId, error: { id } }) => () => dismissErrorWithId(id)
    })
);

export const ErrorFlashBarPure = ({ translations, error, dismissError }) => (
    <div className='ErrorFlashBar'>
        <div>{translations[error.messageTranslationKey]}</div>
        <div onClick={dismissError} className='ErrorFlashBar__close-button'><MaterialIcon icon='close' color='white' size={25}/></div>
    </div>
);


const ErrorFlashBar = connect(
    state => ({ translations: getCurrentTranslations(state) }),
    {
        dismissErrorWithId: removeFlashErrorById
    }
)(enhance(ErrorFlashBarPure));

export default ErrorFlashBar;