import React from 'react';
import * as R from 'ramda';
import { withRouter } from 'react-router';
import { compose, withHandlers } from 'recompose';

import './error-full-screen.scss';


const onRedirectButtonClicked = ({ fatalError, history }) => e => {
    const link = R.path(['redirectButton', 'link'], fatalError);
    history.push(link);
};

const enhance = compose(
    withHandlers({
        onRedirectButtonClicked
    })
);

const ErrorFullScreenPure = ({ fatalError, flashErrors, onRedirectButtonClicked }) => {
    return (
        <div className='ErrorFullScreen'>
                <div className='ErrorFullScreen__fatal-message'>{fatalError.message}</div>
                {
                    fatalError.redirectButton &&
                    <div onClick={onRedirectButtonClicked} className='ErrorFullScreen__redirect-button'>{fatalError.redirectButton.text}</div>
                }
        </div>
    );
};


const ErrorFullScreen = withRouter(enhance(ErrorFullScreenPure));

export default ErrorFullScreen;
