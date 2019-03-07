import React from 'react';
import { connect } from 'react-redux';
import { elementsReact, elementsRedux, routerPaths as RouterPaths } from 'ElementsWebCommon';

const {
  TabNav,
} = elementsReact;

const {
  languageSelectors: {
    getCurrentTranslations,
  },
} = elementsRedux;

export const CollaborationTabsPure = ({ translations, }) => {
  const links = [
    {
      text: translations['collaborationTab__cohesion'],
      to: RouterPaths.collaboration__cohesion,
    },
    {
      text: translations['collaborationTab__interaction'],
      to: RouterPaths.collaboration__interaction,
    },
    {
      text: translations['collaborationTab__allocation'],
      to: RouterPaths.collaboration__allocation,
    },
  ];

  return <TabNav links={links}/>;
};

const CollaborationTabs = connect(
  (state) => ({ translations: getCurrentTranslations(state), }),
  null, null, { pure: false, }
)(CollaborationTabsPure);

export default CollaborationTabs;
