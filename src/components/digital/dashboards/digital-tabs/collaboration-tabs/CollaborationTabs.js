import React from 'react';
import { connect } from 'react-redux';
import RouterPaths from 'Src/routerPaths';
import { getCurrentTranslations } from 'Src/redux/common/language/languageReducer';
import TabNav from 'Src/components/common/tab-nav/TabNav';

export const CollaborationTabsPure = ({ translations }) => {
  const links = [
    {
      text: translations['DigitalCollaborationTabs__adjacencies'],
      to: RouterPaths.collaboration__adjacencies
    },
    {
      text: translations['DigitalCollaborationTabs__comm-distribution'],
      to: RouterPaths.collaboration__communicationDistribution
    },
    // {
    //   text: translations['DigitalCollaborationTabs__response-time'],
    //   to: RouterPaths.collaboration__responseTime
    // }
  ];

  return <TabNav links={links} />;
};

const CollaborationTabs = connect(
  state => ({ translations: getCurrentTranslations(state) }),
  null, null, { pure: false }
)(CollaborationTabsPure);

export default CollaborationTabs;
