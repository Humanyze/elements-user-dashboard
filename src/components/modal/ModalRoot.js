import React from 'react';
import { connect } from 'react-redux';

import ImportEquipmentDataModal from './model-components/import-equpment-data/ImportEquipmentDataModal';
import MODAL_TYPES from './modalTypes.js';
import { closeTopModal } from '../../redux/modal/modalActions';
import { getTopModal } from '../../redux/modal/modalReducer';
import ExportEquipmentDataModal from './model-components/export-equipment-data/ExportEquipmentDataModal';

const MODAL_COMPONENTS = {
    [MODAL_TYPES.IMPORT_EQUIPMENT_MODAL]: ImportEquipmentDataModal,
    [MODAL_TYPES.EXPORT_EQUIPMENT_MODAL]: ExportEquipmentDataModal
};

export const ModalRootPure = ({ openModal, closeModal }) => {
    const SelectedModal = MODAL_COMPONENTS[openModal.type];

    // add warn if selected Modal is null but openModalType is defined
    return SelectedModal ? <SelectedModal closeModal={closeModal}/> : null;
};

const ModalRoot = connect(
    (state) => ({
        openModal: getTopModal(state.modal)
    }),
    { closeModal: closeTopModal }
)(ModalRootPure);

export default ModalRoot;
