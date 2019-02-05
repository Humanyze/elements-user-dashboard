import React from 'react';
import RouterPaths from 'Src/routerPaths';
import { connect } from 'react-redux';
import { elementsReact, elementsRedux } from 'ElementstWebCommon';

const { HeroNav } = elementsReact;

const {
  languageSelectors: { getCurrentTranslations },
} = elementsRedux;

const DigitalHeaderNavPure = ({ translations }) => {
  const navLinks = [
    {
      text: translations['DigitalNav__collaboration-delivery'],
      to: RouterPaths.collaboration,
    },
    {
      text: translations['DigitalNav__workload'],
      to: RouterPaths.workload,
    },
    {
      text: translations['DigitalNav__diversity-inclusion'],
      to: RouterPaths.inclusion,
    },
  ];

  return <HeroNav links={navLinks} />;
};

const DigitalHeaderNav = connect(
  (state) => ({ translations: getCurrentTranslations(state) }),
  null,
  null,
  { pure: false }
)(DigitalHeaderNavPure);

export default DigitalHeaderNav;
