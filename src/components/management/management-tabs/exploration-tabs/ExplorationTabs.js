import React from 'react';
import { connect } from 'react-redux';
import RouterPaths from 'Src/routerPaths';
import { getCurrentTranslations } from 'Src/redux/common/language/languageReducer';
import TabNav from 'Src/components/common/tab-nav/TabNav';

const ExplorationTabsPure = ({ translations }) => {
    const links = [
        {
            text: translations['explorationTab__frequency'],
            to: RouterPaths.exploration__frequency
        },
        {
            text: translations['explorationTab__interaction'],
            to: RouterPaths.exploration__time
        },
        {
            text: translations['explorationTab__distinct'],
            to: RouterPaths.exploration__distinct
        }
    ];

    return <TabNav links={links}/>;
};

const ExplorationTabs = connect(
    state => ({ translations: getCurrentTranslations(state) }),
    null, null, { pure: false }
)(ExplorationTabsPure);

export default ExplorationTabs;