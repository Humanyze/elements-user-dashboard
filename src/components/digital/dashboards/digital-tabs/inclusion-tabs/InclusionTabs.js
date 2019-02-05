import React from 'react';
import { connect } from 'react-redux';
import RouterPaths from 'Src/routerPaths';
import {
  elementsReact,
  elementsRedux
} from 'ElementstWebCommon';

const {
  TabNav
} = elementsReact;

const {
  languageSelectors: {
    getCurrentTranslations
  }
} = elementsRedux;

export const InclusionTabsPure = ({ translations }) => {
  const links = [
    {
      text: translations['DigitalInclusionTabs__comm-by-gender'],
      to  : RouterPaths.inclusion__commByGender
    },
    // {
    //   text: translations['DigitalInclusionTabs__comm-by-gender-per-team'],
    //   to  : RouterPaths.inclusion__commByTeam
    // },
  ];

  return <TabNav links={links}/>;
};

const InclusionTabs = connect(
  state => ({ translations: getCurrentTranslations(state) }),
  null, null, { pure: false }
)(InclusionTabsPure);

export default InclusionTabs;
