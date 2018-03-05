import {createAction} from 'redux-actions';
import MODAL_ACTIONS_TYPES from './modalActionTypes';

const openModal = createAction(MODAL_ACTIONS_TYPES.OPEN_MODAL, modalData => modalData);
const closeTopModal = createAction(MODAL_ACTIONS_TYPES.CLOSE_TOP_MODAL);
const closeAllModals = createAction(MODAL_ACTIONS_TYPES.CLOSE_ALL_MODALS);
const modalClickedOutside = createAction(MODAL_ACTIONS_TYPES.MODAL_CLICK_OUTSIDE);


export {
    openModal,
    closeTopModal,
    closeAllModals,
    modalClickedOutside
};