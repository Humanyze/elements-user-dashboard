import React from 'react';
import { connect } from 'react-redux';
import { getAllFlashErrors, getTopFatalError } from 'Src/redux/error/errorReducer';
import ErrorFlashBar from './error-flash-bar/errorFlashBar';

const ErrorManagerPure = ({ fatalError, flashErrors }) => {
    return fatalError ?
        <errorFullScreen fatalError={fatalError} flashErrors={flashErrors}/> :
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

)(ErrorManagerPure);

export default ErrorManager;