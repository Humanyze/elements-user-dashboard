import React from 'react';
import { connect } from 'react-redux';
import RouterPaths from 'Src/routerPaths';
import { getCurrentTranslations } from 'Src/redux/common/language/languageReducer';
import TabNav from 'Src/components/common/tab-nav/TabNav';

export const CollaborationTabsPure = ({ translations }) => {
    const links = [
        {
            text: translations['collaborationTab__cohesion'],
            to: RouterPaths.collaboration__cohesion
        },
        {
            text: translations['collaborationTab__interaction'],
            to: RouterPaths.collaboration__interaction
        },
        {
            text: translations['collaborationTab__allocation'],
            to: RouterPaths.collaboration__allocation
        }
    ];

    return <TabNav links={links}/>;
};

const CollaborationTabs = connect(
    state => ({ translations: getCurrentTranslations(state) }),
    null, null, { pure: false }
)(CollaborationTabsPure);

export default CollaborationTabs;