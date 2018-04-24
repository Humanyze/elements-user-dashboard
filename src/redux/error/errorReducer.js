import { handleActions } from 'redux-actions';
import ERROR_ACTION_TYPES from './errorActionTypes';
import { createSelector } from 'reselect';

export const initialState = {
    flashErrorIds: [],
    flashErrorsById: {},
    fatalErrors: []
};
const errorReducer = handleActions({
    [ERROR_ACTION_TYPES.ADD_FLASH_ERROR]: (state, { payload }) => ({
        ...state,
        flashErrorIds: [...state.flashErrorIds, payload.id],
        flashErrorsById: {
            ...state.flashErrorsById,
            [payload.id]: payload
        }
    }),
    [ERROR_ACTION_TYPES.REMOVE_FLASH_ERROR_BY_ID]: (state, { payload: id }) => ({
        ...state,
        flashErrorIds: state.flashErrorIds.filter(errorId => errorId !== id),
        flashErrorsById: Object.keys(state.flashErrorsById).filter(key => key !== id).reduce((obj, key) => ({
            ...obj,
            [key]: state.flashErrorsById[key]
        }), {})
    }),
}, initialState);

export default errorReducer;


const getFlashErrorIds = (state) => state.error.flashErrorIds;
const getFlashErrorsById = (state) => state.error.flashErrorsById;

const getAllFlashErrors = createSelector(
    getFlashErrorIds,
    getFlashErrorsById,
    (ids, errorsById) => ids.map(id => errorsById[id])
);

const getTopFatalError = (state) => {
};

export {
    getAllFlashErrors,
    getTopFatalError
};