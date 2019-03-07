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

const CommunicationTabsPure = ({ translations, }) => {
  const links = [
    {
      text: translations['communicationTab__patterns'],
      to: RouterPaths.communication__patterns,
    },
  ];

  return <TabNav links={links}/>;
};

const CommunicationTabs = connect(
  (state) => ({ translations: getCurrentTranslations(state), }),
  null, null, { pure: false, }
)(CommunicationTabsPure);

export default CommunicationTabs;
