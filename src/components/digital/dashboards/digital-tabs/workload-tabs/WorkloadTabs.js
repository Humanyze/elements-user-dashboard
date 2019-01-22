import React from 'react';
import { connect } from 'react-redux';
import RouterPaths from 'Src/routerPaths';
import { getCurrentTranslations } from 'Src/redux/common/language/languageReducer';
import TabNav from 'Src/components/common/tab-nav/TabNav';

export const WorkloadTabsPure = ({ translations }) => {
  const links = [
    {
      text: translations['DigitalWorkloadTabs__workday-length'],
      to: RouterPaths.workload__workdayLength
    },
    // {
    //   text: translations['DigitalWorkloadTabs__drivers'],
    //   to: RouterPaths.workload__drivers
    // },
    {
      text: translations['DigitalWorkloadTabs__response-time'],
      to: RouterPaths.workload__responseTime
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
