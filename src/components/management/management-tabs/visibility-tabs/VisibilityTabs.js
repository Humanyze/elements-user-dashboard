import React from 'react';
import { connect } from 'react-redux';
import RouterPaths from 'Src/routerPaths';
import { getCurrentTranslations } from 'Src/redux/common/language/languageReducer';
import TabNav from 'Src/components/common/tab-nav/TabNav';

const VisibilityTabsPure = ({ translations }) => {
    const links = [
        {
            text: translations['visibilityTab__manager'],
            to: RouterPaths.visibility__manager
        },
    ];

    return <TabNav links={links}/>;
};

const VisibilityTabs = connect(
    state => ({ translations: getCurrentTranslations(state) }),
    null, null, { pure: false }
)(VisibilityTabsPure);

export default VisibilityTabs;