import React from 'react';
import { connect } from 'react-redux';
import { getAllFlashErrors, getTopFatalError } from 'Src/redux/error/errorReducer';
import ErrorFlashBar from './error-flash-bar/errorFlashBar';
import ErrorFullScreen from './error-full-screen/errorFullScreen';

import { removeFlashErrorById } from 'Src/redux/error/errorActions';

const ErrorManagerPure = ({ fatalError, flashErrors }) => {
    return fatalError.type ?
        <ErrorFullScreen fatalError={fatalError} flashErrors={flashErrors}/> :
        <div className='flashErrorWrapper'>
            {
                flashErrors.map((error) => (
                    <ErrorFlashBar error={error} key={error.id}/>
                ))
            }
        </div> ;
};


const ErrorManager = connect(
    (state) => ({ fatalError: getTopFatalError(state), flashErrors: getAllFlashErrors(state) }),
    {
        removeFlashErrorById: removeFlashErrorById
    }
)(ErrorManagerPure);

export default ErrorManager;