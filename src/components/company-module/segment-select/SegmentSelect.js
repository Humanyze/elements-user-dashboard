import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose, lifecycle /*, withHandlers*/ } from 'recompose';
import { withRouter } from 'react-router-dom';
import SegmentsTable from './list-segments/SegmentsTable';

import {
  elementsReact,
  elementsRedux
} from 'ElementsWebCommon';

import './segment-select.scss';

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

export const SelectSegmentPure = ({
  translations,
  showLoading,
  segments,
}) => {

  return (
    <div>
      <ActionSubBar/>
      <SegmentsTable segments={segments} showLoading={showLoading} translations={translations}/>
    </div>
  );
};


const SelectSegment = connect(
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
)(withRouter(enhance(SelectSegmentPure)));

SelectSegment.propTypes = {
  showLoading: PropTypes.bool.isRequired,
  segments: PropTypes.array.isRequired,
};

export default SelectSegment;
