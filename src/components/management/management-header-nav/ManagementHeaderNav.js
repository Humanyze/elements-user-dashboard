import React from 'react';
import RouterPaths from 'Src/routerPaths';
import { getCurrentTranslations } from 'Redux/common/language/languageReducer';
import { connect } from 'react-redux';
import HeroNav from 'Common/hero-nav/HeroNav';

const ManagementHeaderNavPure = ({ translations }) => {
    const navLinks = [
        {
            text: translations['managementNav__team-collaboration'],
            to  : RouterPaths.collaboration
        },
        {
            text: translations['managementNav__team-exploration'],
            to  : RouterPaths.exploration
        },
        {
            text: translations['managementNav__management-visibility'],
            to  : RouterPaths.visibility
        },
        {
            text: translations['managementNav__communication-network'],
            to  : RouterPaths.communication
        },
    ];

    return (
        <HeroNav links={navLinks}/>
    );
};

const ManagementHeaderNav = connect(
    state => ({ translations: getCurrentTranslations(state) }),
    null, null, { pure: false }
)(ManagementHeaderNavPure);

export default ManagementHeaderNav;
