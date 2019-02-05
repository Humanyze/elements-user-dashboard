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

export const WorkloadTabsPure = ({ translations }) => {
  const links = [
    {
      text: translations['DigitalWorkloadTabs__workday-length'],
      to: RouterPaths.workload__workdayLength
    },
    {
      text: translations['DigitalWorkloadTabs__drivers'],
      to: RouterPaths.workload__drivers
    },
    {
      text: translations['DigitalWorkloadTabs__time-allocation'],
      to: RouterPaths.workload__timeAllocation
    }
  ];

  return <TabNav links={links}/>;
};

const WorkloadTabs = connect(
  state => ({ translations: getCurrentTranslations(state) }),
  null, null, { pure: false }
)(WorkloadTabsPure);

export default WorkloadTabs;
