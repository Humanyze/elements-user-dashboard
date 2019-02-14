import React from 'react';
import { connect } from 'react-redux';
import RouterPaths from 'Src/routerPaths';
import {
  elementsReact,
  elementsRedux
} from 'ElementsWebCommon';

const {
  TabNav,
} = elementsReact;

const {
  languageSelectors: {
    getCurrentTranslations,
  },
} = elementsRedux;

export const InclusionTabsPure = ({ translations, }) => {
  const links = [
    {
      text: translations['DigitalInclusionTabs__comm-by-gender'],
      to: RouterPaths.inclusion__commByGender,
    },
    {
      text: translations['DigitalInclusionTabs__comm-by-gender-per-group'],
      to: RouterPaths.inclusion__commByGenderPerGroup,
    },
  ];

  return <TabNav links={links}/>;
};

const InclusionTabs = connect(
  (state) => ({ translations: getCurrentTranslations(state), }),
  null, null, { pure: false, }
)(InclusionTabsPure);

export default InclusionTabs;
