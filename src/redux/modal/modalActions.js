import {createAction} from 'redux-actions';
import MODAL_ACTIONS_TYPES from './modalActionTypes';


const openModal = createAction(MODAL_ACTIONS_TYPES.OPEN_MODAL, modalType => modalType);
const closeTopModal = createAction(MODAL_ACTIONS_TYPES.CLOSE_TOP_MODAL);
const closeAllModals = createAction(MODAL_ACTIONS_TYPES.CLOSE_ALL_MODALS);



export {
    openModal,
    closeTopModal,
    closeAllModals
};