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

const VisibilityTabsPure = ({ translations, }) => {
  const links = [
    {
      text: translations['visibilityTab__manager'],
      to: RouterPaths.visibility__manager,
    },
  ];

  return <TabNav links={links}/>;
};

const VisibilityTabs = connect(
  (state) => ({ translations: getCurrentTranslations(state), }),
  null, null, { pure: false, }
)(VisibilityTabsPure);

export default VisibilityTabs;
