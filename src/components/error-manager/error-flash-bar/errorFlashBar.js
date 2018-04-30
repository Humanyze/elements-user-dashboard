import React from 'react';
import { connect } from 'react-redux';
import MaterialIcon from 'material-icons-react';


import './error-flash-bar.scss';
import { removeFlashErrorById } from 'Src/redux/error/errorActions';
import { compose, withHandlers } from 'recompose';


const enhance = compose(
    withHandlers({
        dismissError: ({ dismissErrorWithId, error: { id } }) => () => dismissErrorWithId(id)
    })
);

export const ErrorFlashBarPure = ({ error, dismissError }) => (
    <div className='ErrorFlashBar'>
        <div>{error.message}</div>
        <div onClick={dismissError} className='ErrorFlashBar__close-button'><MaterialIcon icon='close' color='white' size={25}/></div>
    </div>
);


const ErrorFlashBar = connect(
    null,
    {
        dismissErrorWithId: removeFlashErrorById
    }
)(enhance(ErrorFlashBarPure));

export default ErrorFlashBar;