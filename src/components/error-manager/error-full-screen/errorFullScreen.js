import React from 'react';
import * as R from 'ramda';
import { withRouter } from 'react-router';
import { compose, withHandlers } from 'recompose';

import './error-full-screen.scss';
import { connect } from 'react-redux';
import { getCurrentTranslations } from 'Src/redux/language/languageReducer';


const onRedirectButtonClicked = ({ fatalError, history }) => e => {
    const link = R.path(['redirectButton', 'link'], fatalError);
    history.push(link);
};

const enhance = compose(
    withHandlers({
        onRedirectButtonClicked
    })
);

export const ErrorFullScreenPure = ({ translations, fatalError, flashErrors, onRedirectButtonClicked }) => {
    return (
        <div className='ErrorFullScreen'>
                <div className='ErrorFullScreen__fatal-message'>{translations[fatalError.messageTranslationKey]}</div>
                {
                    fatalError.redirectButton &&
                    <div onClick={onRedirectButtonClicked} className='ErrorFullScreen__redirect-button'>{translations[fatalError.redirectButton.textKey]}</div>
                }
        </div>
    );
};


const ErrorFullScreen = connect(
    state => ({ translations: getCurrentTranslations(state) })
)(withRouter(enhance(ErrorFullScreenPure)));

export default ErrorFullScreen;
