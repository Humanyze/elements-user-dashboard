import React from 'react';
import { connect } from 'react-redux';
import RouterPaths from 'Src/routerPaths';
import { getCurrentTranslations } from 'Src/redux/common/language/languageReducer';
import TabNav from 'Src/components/common/tab-nav/TabNav';

const CommunicationTabsPure = ({ translations }) => {
    const links = [
        {
            text: translations['communicationTab__patterns'],
            to: RouterPaths.communication__patterns
        },
    ];

    return <TabNav links={links}/>;
};

const CommunicationTabs = connect(
    state => ({ translations: getCurrentTranslations(state) }),
    null, null, { pure: false }
)(CommunicationTabsPure);

export default CommunicationTabs;