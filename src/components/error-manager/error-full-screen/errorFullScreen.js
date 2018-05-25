import React from 'react';
import * as R from 'ramda';
import { withRouter } from 'react-router';
import { compose, withHandlers } from 'recompose';

import './error-full-screen.scss';
import { connect } from 'react-redux';
import { getCurrentTranslations } from 'Src/redux/language/languageReducer';


const onRedirectButtonClicked = ({ history }) => uri => e => {
    history.push(uri);
};

const enhance = compose(
    withHandlers({
        onRedirectButtonClicked
    })
);

export const ErrorFullScreenPure = ({ translations, fatalError, flashErrors, onRedirectButtonClicked }) => {
    return (
        <div className='ErrorFullScreen'>
            <div className='ErrorFullScreen__fatal-message'>
                {translations[fatalError.messageTranslationKey]}
            </div>
            <div className='ErrorFullScreen__button-block'>
                {
                    fatalError.redirectButtons.map(button => (
                        button.reload ?
                            <a href={button.link}
                               key={button.link}>
                                <div className='ErrorFullScreen__redirect-button'>
                                    {translations[button.textKey]}
                                </div>
                            </a>
                            :
                            <div onClick={onRedirectButtonClicked(button.link)}
                                 className='ErrorFullScreen__redirect-button'
                                 key={button.link}>
                                {translations[button.textKey]}
                            </div>
                    ))
                }
            </div>
        </div>
    );
};


const ErrorFullScreen = connect(
    state => ({ translations: getCurrentTranslations(state) })
)(withRouter(enhance(ErrorFullScreenPure)));

export default ErrorFullScreen;
