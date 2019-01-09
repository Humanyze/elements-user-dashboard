import React from 'react';
import { connect } from 'react-redux';
import RouterPaths from 'Src/routerPaths';
import { getCurrentTranslations } from 'Src/redux/common/language/languageReducer';
import TabNav from 'Src/components/common/tab-nav/TabNav';

export const InclusionTabsPure = ({ translations }) => {
  const links = [
    {
      text: translations['DigitalInclusionTabs__comm-by-gender'],
      to  : RouterPaths.inclusion__commByGender
    },
    {
      text: translations['DigitalInclusionTabs__comm-by-gender-per-team'],
      to  : RouterPaths.inclusion__commByTeam
    },
  ];

  return <TabNav links={links}/>;
};

const InclusionTabs = connect(
  state => ({ translations: getCurrentTranslations(state) }),
  null, null, { pure: false }
)(InclusionTabsPure);

export default InclusionTabs;