import React from 'react';
import PropTypes from 'prop-types';

//import ParticipantsTable from './participants-table/ParticipantsTable';
import { connect } from 'react-redux';
import { compose, lifecycle /*, withHandlers*/ } from 'recompose';
import { withRouter } from 'react-router-dom';
//import * as queryString from 'ElementsWebCommon/react/utils/query-string';
import SegmentsTable from './list-segments/SegmentsTable';

import {
  elementsReact,
  elementsRedux
} from 'ElementsWebCommon';

const {
  ActionSubBar,
} = elementsReact;
const {
  languageSelectors: {
    getCurrentTranslations,
  },
  deploymentActions: {
    fetchDeploymentById,
    setSelectedDeploymentId,
  },
  deploymentSelectors: {
    getSelectedDeployment,
  },
} = elementsRedux;

const withLifecycle = lifecycle({
  componentDidMount() {
    // const {
    //   setSelectedDeploymentId,
    //   requestParticipantsData,
    // } = this.props;

    // setSelectedDeploymentId(dataId);
    // requestParticipantsData(dataId);
  },

  componentWillUnmount() {
    this.props.cancelParticipantDataRequests();
  },

});

const enhance = compose(
  withLifecycle
);

export const SegmentsOverviewPure = ({
  showLoading,
  segments,
}) => {

  return (
    <div>
      <ActionSubBar/>
      <SegmentsTable segments={segments} showLoading={showLoading}/>
    </div>
  );
};


const SegmentsOverview = connect(
  (state) => ({
    selectedDeployment: getSelectedDeployment(state),
    //participants: getParticipantsForSegment(state),
    showLoading: state.participants.requestPending || state.deployment.requestPending,
    translations: getCurrentTranslations(state),
  }),
  {
    setSelectedDeploymentId,
    fetchDeploymentById,
  }
)(withRouter(enhance(SegmentsOverviewPure)));

SegmentsOverview.propTypes = {
  showLoading: PropTypes.bool.isRequired,
  segments: PropTypes.array.isRequired,
};

export default SegmentsOverview;
