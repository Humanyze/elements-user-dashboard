import React from 'react';
import PropTypes from 'prop-types';

import ParticipantsTable from './participants-table/ParticipantsTable';
import { connect } from 'react-redux';
import { compose, lifecycle, withHandlers } from 'recompose';
import { withRouter } from 'react-router-dom';
import * as queryString from 'ElementsWebCommon/react/utils/query-string';

import { requestParticipantsData, cancelParticipantDataRequests } from 'Redux/participants/participantsActions';
import { setPage, setLimit, setInitialPage } from 'Redux/participants-ui/participantsUIActions';
import { getVisibleParticipants, getCurrentPageNumber, getTotalPageCount, showLoadingOnPageChange  } from 'Redux/participants/participantsReducer';

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
  translationPropTypeShape
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
      setInitialPage,
      setLimit,
      setSelectedDeploymentId,
      requestParticipantsData,
    } = this.props;

    const { perPage = '20', page = '1', } = queryString.parse(search);

    const pageNumber = parseInt(page, 10);
    const limit = parseInt(perPage, 10);
    const dataId = parseInt(datasetId, 10);


    setInitialPage(pageNumber);
    setLimit(limit);
    setSelectedDeploymentId(dataId);

    requestParticipantsData(dataId, limit, pageNumber);
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

const onPaginationPageClicked = ({ history, }) => (number) => (e) => {
  const { pathname, search, } = history.location;
  const queryObj = queryString.parse(search);
  const updatedPageQuery = { ...queryObj, page: number, };
  history.push({
    pathname,
    search: queryString.stringify(updatedPageQuery),
  });
};


const enhance = compose(
  withLifecycle,
  withHandlers({
    onPaginationPageClicked,
  })
);

const DeploymentOverviewPure = ({ selectedDeployment, activePageNumber, numberOfPages, onPaginationPageClicked, participants, showLoading, paginationLoading, match: { params: { datasetId, }, }, fetchDeploymentById, translations, }) => {
  if (!selectedDeployment && !showLoading) {
    fetchDeploymentById(datasetId);
  }

  const TableProps = {
    activePageNumber,
    numberOfPages,
    participants,
    showLoading,
    paginationLoading,
    translations,
    onPaginationPageClicked,
  };

  return (
    <div>
      <DeploymentActionSubBar/>
      <ParticipantsTable {...TableProps} />
    </div>
  );
};

DeploymentOverviewPure.propTypes = {
    translations: translationPropTypeShape.isRequired,
    selectedDeployment: PropTypes.object.isRequired,
    activePageNumber: PropTypes.number.isRequired,
    numberOfPages: PropTypes.number.isRequired,
    onPaginationPageClicked: PropTypes.func.isRequired,
    participants: PropTypes.arrayOf(PropTypes.object).isRequired,
    showLoading: PropTypes.bool.isRequired,
    paginationLoading: PropTypes.bool.isRequired,
    match: PropTypes.object.isRequired,
    fetchDeploymentById: PropTypes.func.isRequired,
}

const DeploymentOverview = connect(
  (state) => ({
    selectedDeployment: getSelectedDeployment(state),
    participants: getVisibleParticipants(state),
    showLoading: state.participants.requestPending || state.deployment.requestPending,
    paginationLoading: showLoadingOnPageChange(state),
    activePageNumber: getCurrentPageNumber(state),
    numberOfPages: getTotalPageCount(state),
    translations: getCurrentTranslations(state),
  }),
  {
    setSelectedDeploymentId,
    requestParticipantsData,
    cancelParticipantDataRequests,
    fetchDeploymentById,
    setPage,
    setInitialPage,
    setLimit,
  },
)(withRouter(enhance(DeploymentOverviewPure)));

console.log(DeploymentOverview, DeploymentOverviewPure);
export default DeploymentOverview;
