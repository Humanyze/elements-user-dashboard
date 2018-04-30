import { createAction } from 'redux-actions';
import ERROR_ACTION_TYPES from './errorActionTypes';

const getInsecureRandomId = () => Math.floor(Math.random() * 100000);

const addFlashError = createAction(ERROR_ACTION_TYPES.ADD_FLASH_ERROR, config => config);
const removeFlashErrorById = createAction(ERROR_ACTION_TYPES.REMOVE_FLASH_ERROR_BY_ID, id => id);

const addFlashErrorWithFadout = (messageConfig) => async (dispatch) => {
    const errorId = getInsecureRandomId();
    dispatch(addFlashError({ ...messageConfig, id: errorId }));

    setTimeout(() => dispatch(removeFlashErrorById(errorId)), messageConfig.timeout || 5000);
};

const addFatalError = createAction(ERROR_ACTION_TYPES.ADD_FATAL_ERROR, config => config);

export {
    addFlashError,
    removeFlashErrorById,
    addFlashErrorWithFadout,
    addFatalError
};