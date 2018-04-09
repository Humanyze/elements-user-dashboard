import { handleActions } from 'redux-actions';
import MODAL_ACTION_TYPES from './modalActionTypes';
// import { createSelector } from 'reselect';


export const initialState = {
    modals: []
};

const modalReducer = handleActions({
    [MODAL_ACTION_TYPES.OPEN_MODAL]: (state, action) => ({
        ...state,
        modals: [...state.modals, action.payload]
    }),
    [MODAL_ACTION_TYPES.CLOSE_TOP_MODAL]: (state) => {
        return removeTopModal(state);
    },
    [MODAL_ACTION_TYPES.CLOSE_ALL_MODALS]: (state) => ({
        ...state,
        modals: initialState.modals
    }),
    [MODAL_ACTION_TYPES.MODAL_CLICK_OUTSIDE]: (state) => {
        return getTopModal(state).exitOnClickElsewhere ?
            removeTopModal(state): state;
    }
}, initialState);

const removeTopModal = state => {
    const newModals = state.modals.splice(0, -1);
    return { ...state, modals: newModals };
};

export const getTopModal = state =>
    state.modals.slice(-1)[0] || {};


export default modalReducer;