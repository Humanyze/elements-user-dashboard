import React from 'react';
import {connect} from "react-redux";

import ImportEquipmentDataModal from "./model-components/import-equpment-data/ImportEquipmentData";
import MODAL_TYPES from './modalTypes.js';
import {closeTopModal} from "../../redux/modal/modalActions";
import {getTopModalType} from '../../redux/modal/modalReducer';
import ExportEquipmentDataModal from "./model-components/export-equipment-data/exportEquipmentData";

const MODAL_COMPONENTS = {
    [MODAL_TYPES.IMPORT_EQUIPMENT_MODAL]: ImportEquipmentDataModal,
    [MODAL_TYPES.EXPORT_EQUIPMENT_MODAL]: ExportEquipmentDataModal
};

export const ModalRootPure = ({openModalType, closeModal}) => {
    const SelectedModal = openModalType ?
        MODAL_COMPONENTS[openModalType] :
        console.warn('Invalid Modal Type passed');

    return SelectedModal ? <SelectedModal closeModal={closeModal}/> : null;
};

const ModalRoot = connect(
    (state) => ({
        openModals: getTopModalType(state)
    }),
    {closeModal: closeTopModal}
)(ModalRootPure);

export default ModalRoot;
