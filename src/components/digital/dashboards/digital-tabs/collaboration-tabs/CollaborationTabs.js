import React from 'react';
import { connect } from 'react-redux';
import RouterPaths from 'Src/routerPaths';
import {
  elementsReact,
  elementsRedux
} from 'elements-web-common';

const {
  TabNav
} = elementsReact;

const {
  languageSelectors: {
    getCurrentTranslations
  }
} = elementsRedux;

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
    {
      text: translations['DigitalCollaborationTabs__response-time'],
      to: RouterPaths.collaboration__responseTime
    }
  ];

  return <TabNav links={links} />;
};

const CollaborationTabs = connect(
  state => ({ translations: getCurrentTranslations(state) }),
  null, null, { pure: false }
)(CollaborationTabsPure);

export default CollaborationTabs;
