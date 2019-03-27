import React from 'react';
import { connect } from 'react-redux';
import { elementsReact, elementsRedux, routerPaths as RouterPaths } from 'ElementsWebCommon';

const {
  MetricModuleLinkBlock,
} = elementsReact;

const {
  languageSelectors: {
    getCurrentTranslations,
  },
} = elementsRedux;

const ManagementHeaderNavPure = ({ translations, deploymentName, deploymentSelectionPath, }) => {
  const navLinks = [
    {
      text: translations['managementNav__team-collaboration'],
      to: RouterPaths.collaboration,
    },
    {
      text: translations['managementNav__team-exploration'],
      to: RouterPaths.exploration,
    },
    {
      text: translations['managementNav__communication-network'],
      to: RouterPaths.communication,
    },
  ];

  return (
    <MetricModuleLinkBlock links={navLinks} deploymentName={deploymentName} deploymentSelectionPath={deploymentSelectionPath} />
  );
};

const ManagementHeaderNav = connect(
  (state) => ({ translations: getCurrentTranslations(state), }),
  null, null, { pure: false, }
)(ManagementHeaderNavPure);

export default ManagementHeaderNav;
