import React from 'react';
import PropTypes from 'prop-types';

import ParticipantsTable from './participants-table/ParticipantsTable';
import { connect } from 'react-redux';
import { compose, lifecycle, withHandlers } from 'recompose';
import { withRouter } from 'react-router-dom';
import * as queryString from 'ElementsWebCommon/react/utils/query-string';

import {
  elementsReact,
  elementsRedux
} from 'ElementsWebCommon';

const {
  DeploymentActionSubBar,
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
    const {
      history: {
        location: {
          search,
        },
      },
      match: {
        params:
          {
            datasetId,
          },
      },
      setSelectedDeploymentId,
      requestParticipantsData,
    } = this.props;

    const dataId = parseInt(datasetId, 10);

    setSelectedDeploymentId(dataId);
    requestParticipantsData(dataId);
  },
  componentDidUpdate(previousProps) {
    const {
      history: {
        location: {
          search,
        },
      },
      setPage,
    } = this.props;

    const {
      // perPage = '20',
      page = '1',
    } = queryString.parse(search);

    const { page: oldPage = '1', } = queryString.parse(previousProps.location.search);
    const pageNumber = parseInt(page, 10);

    if (pageNumber && parseInt(oldPage, 10) !== pageNumber) {
      setPage(pageNumber);
    }
  },
  componentWillUnmount() {
    this.props.cancelParticipantDataRequests();
  },

});

const enhance = compose(
  withLifecycle
);

const SegmentsOverviewPure = ({
  selectedDeployment,
  showLoading,
  match: { params: { datasetId, }, },
  participants,
  fetchDeploymentById,
  translations,
}) => {

  if (!selectedDeployment && !showLoading) {
    fetchDeploymentById(datasetId);
  }

  return (
    <div>
      <DeploymentActionSubBar/>
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
  selectedDeployment: PropTypes.object.isRequired,
  participants: PropTypes.arrayOf(PropTypes.object).isRequired,
  showLoading: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  fetchDeploymentById: PropTypes.func.isRequired,
};

console.log(SegmentsOverview, SegmentsOverviewPure);
export default SegmentsOverview;
