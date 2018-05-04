import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { withRouter } from 'react-router';

import { getTopModal } from 'Redux/modal/modalReducer';
import { closeAllModals, closeTopModal } from 'Src/redux/modal/modalActions';

import MODAL_TYPES from './modalTypes.js';

import ImportParticipantDataModal from './modal-components/import-participant-data/ImportParticipantDataModal';


const enhance = compose(
    lifecycle({
        componentDidUpdate({ location }) {
            const { location: oldLocation, closeAllModals, openModal } = this.props;

            if (openModal.type && oldLocation !== location) {
                closeAllModals();
            }
        }
    })
);

const MODAL_COMPONENTS = {
    [MODAL_TYPES.IMPORT_PARTICIPANT_MODAL]: ImportParticipantDataModal,
};

export const ModalRootPure = ({ openModal, closeModal }) => {
    const SelectedModal = MODAL_COMPONENTS[openModal.type];
    return SelectedModal ? <SelectedModal closeModal={closeModal}/> : null;
};

const ModalRoot =
    withRouter(
        connect(
            (state) => ({
                openModal: getTopModal(state.modal)
            }),
            { closeModal: closeTopModal, closeAllModals: closeAllModals }
        )(enhance(ModalRootPure))
    );

export default ModalRoot;
