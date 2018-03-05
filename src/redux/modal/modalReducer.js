import {handleActions} from 'redux-actions';
import MODAL_ACTION_TYPES from './modalActionTypes';
import { createSelector } from 'reselect';


export const initialState = {
    modals: []
};

const modalReducer = handleActions({
    [MODAL_ACTION_TYPES.OPEN_MODAL]: (state, action) => ({
        modals: [...state.modals, action.payload]
    }),
    [MODAL_ACTION_TYPES.CLOSE_TOP_MODAL]: (state, action) => {
        const newModals = state.modals.splice(0, -1);
        return {modals: newModals};
    },
    [MODAL_ACTION_TYPES.CLOSE_ALL_MODALS]: (state, action) => ({
        modals: initialState.modals
    })
}, initialState);


export const getTopModalType = state => {
    return state.modal.modals.slice(-1)[0]
};




export default modalReducer;