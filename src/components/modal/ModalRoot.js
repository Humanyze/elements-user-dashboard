import React from 'react';
import PropTypes from 'prop-types';

// needs to be hooked into redux, 
// or could be used with context options
// for now not introducing extra libraries and is called from parent

export const MODAL_TYPES = {
    EXPORT_DIALOG: 'EXPORT_DIALOG'
};

const MODAL_COMPONENTS = {
    [MODAL_TYPES.EXPORT_DIALOG]: () => {}
};

const ModalRoot = ({openModals}) => {
    return openModals.length ? <div>Hello World</div>: null;
};

ModalRoot.propTypes = {
    openModals: PropTypes.arrayOf(PropTypes.string)
}

export default ModalRoot;
