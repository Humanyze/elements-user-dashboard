import React from 'react';
import ActionSubBar from './action-sub-bar/ActionSubBar';
import ParticipantsTable from './participants-table/ParticipantsTable';
import { connect } from 'react-redux';
import { compose, lifecycle, withHandlers } from 'recompose';
import { withRouter } from 'react-router';
import * as queryString from 'Utils/query-string';

import { getSelectedDeployment } from 'Redux/common/deployment/deploymentReducer';
import { setSelectedDeploymentId } from 'Redux/common/deployment/deploymentActions';
import { requestParticipantsData } from 'Redux/participants/participantsActions';
import { setPage, setLimit } from 'Redux/participants-ui/participantsUIActions';
import { getVisibleParticipants } from 'Redux/participants/participantsReducer';
import { fetchDeploymentById } from 'Redux/common/deployment/deploymentActions';
import { getCurrentTranslations } from 'Src/redux/common/language/languageReducer';
import { cancelParticipantDataRequests } from 'Src/redux/participants/participantsActions';
import { showLoadingOnPageChange } from 'Src/redux/participants/participantsReducer';
import { setInitialPage } from 'Src/redux/participants-ui/participantsUIActions';
import { getCurrentPageNumber, getTotalPageCount } from '../../../redux/participants/participantsReducer';

const withDidMount = lifecycle({
  componentDidMount() {
    const {
      history: {
        location: {
          search
        }
      },
      match  : {
        params:
          {
            datasetId
          }
      },
      setInitialPage,
      setLimit,
      setSelectedDeploymentId,
      requestParticipantsData
    } = this.props;

    const { perPage = '20', page = '1' } = queryString.parse(search);

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
          search
        }
      },
      setPage
    } = this.props;

    const {
      // perPage = '20',
      page = '1'
    } = queryString.parse(search);

    const { page: oldPage = '1' } = queryString.parse(previousProps.location.search);
    const pageNumber = parseInt(page, 10);

    if (pageNumber && parseInt(oldPage, 10) !== pageNumber) {
      setPage(pageNumber);
    }
  },
  componentWillUnmount() {
    this.props.cancelParticipantDataRequests();
  }

});

const onPaginationPageClicked = ({ history }) => number => e => {
  const { pathname, search } = history.location;
  const queryObj = queryString.parse(search);
  const updatedPageQuery = { ...queryObj, page: number };
  history.push({
    pathname,
    search: queryString.stringify(updatedPageQuery)
  });
};

const enhance = compose(
  withDidMount,
  withHandlers({
    onPaginationPageClicked
  })
);

export const DeploymentOverviewPure = ({ selectedDeployment, activePageNumber, numberOfPages, onPaginationPageClicked, participants, showLoading, paginationLoading, match: { params: { datasetId } }, fetchDeploymentById, translations }) => {
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
    onPaginationPageClicked
  };

  return (
    <div>
      <ActionSubBar/>
      <ParticipantsTable {...TableProps} />
    </div>
  );
};

const DeploymentOverview = connect(
  (state) => ({
    selectedDeployment: getSelectedDeployment(state),
    participants      : getVisibleParticipants(state),
    showLoading       : state.participants.requestPending || state.deployment.requestPending,
    paginationLoading : showLoadingOnPageChange(state),
    activePageNumber  : getCurrentPageNumber(state),
    numberOfPages     : getTotalPageCount(state),
    translations      : getCurrentTranslations(state),

  }),
  {
    setSelectedDeploymentId,
    requestParticipantsData,
    cancelParticipantDataRequests,
    fetchDeploymentById,
    setPage,
    setInitialPage,
    setLimit
  },
)(withRouter(enhance(DeploymentOverviewPure)));

export default DeploymentOverview;