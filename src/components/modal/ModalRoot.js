import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { withRouter } from 'react-router-dom';
import { elementsRedux } from 'ElementsWebCommon';

import MODAL_TYPES from './modalTypes.js';

const {
    modalSelectors: {
        getTopModal
    },
    modalActions: {
        closeAllModals,
        closeTopModal
    }
} = elementsRedux;

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
    [MODAL_TYPES.IMPORT_PARTICIPANT_MODAL]: () => <div>test case</div>
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
