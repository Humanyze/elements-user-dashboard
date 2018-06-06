import React from 'react';
import ActionSubBar from './action-sub-bar/ActionSubBar';
import ParticipantsTable from './participants-table/ParticipantsTable';
import { connect } from 'react-redux';
import { compose, lifecycle, withHandlers } from 'recompose';
import { withRouter } from 'react-router';
import * as queryString from 'Utils/query-string';

import { getSelectedDeployment } from 'Redux/deployment/deploymentReducer';
import { setSelectedDeploymentId } from 'Redux/deployment/deploymentActions';
import { requestParticipantsData } from 'Redux/participants/participantsActions';
import { setPage, setLimit } from 'Redux/participants-ui/participantsUIActions';
import { getVisibleParticipants } from 'Redux/participants/participantsReducer';
import { fetchDeploymentById } from 'Redux/deployment/deploymentActions';
import { getCurrentTranslations } from 'Src/redux/common/language/languageReducer';
import { cancelParticipantDataRequests } from 'Src/redux/participants/participantsActions';
import { showLoadingOnPageChange } from 'Src/redux/participants/participantsReducer';
import { setInitialPage } from 'Src/redux/participants-ui/participantsUIActions';
import { getCurrentPageNumber, getTotalPageCount } from '../../../redux/participants/participantsReducer';


const onPropUpdate = (props) => {
    const { location: { search }, match: { params: { datasetId } } } = props;

    const { perPage = '20', page = '1' } = queryString.parse(search);

    const pageNumber = parseInt(page, 10);
    const limit = parseInt(perPage, 10);
    const dataId = parseInt(datasetId, 10);


    props.setInitialPage(pageNumber);
    props.setLimit(limit);
    props.requestParticipantsData(dataId, limit, pageNumber);
    props.setSelectedDeploymentId(dataId);
};

const withDidMount = lifecycle({
    componentWillMount() {
        onPropUpdate(this.props);
    },
    componentWillReceiveProps(props) {
        const { location: { search } } = props;

        const {
            // perPage = '20',
            page
        } = queryString.parse(search);

        const { page: oldPage } = queryString.parse(this.props.location.search);
        const pageNumber = parseInt(page, 10);

        if (pageNumber && parseInt(oldPage, 10) !== pageNumber) props.setPage(pageNumber);
    },
    componentWillUnmount() {
        this.props.cancelParticipantDataRequests();
    }

});

const onPaginationPageClicked = ({ history, location }) => number => e => {
    const { pathname, search } = location;
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

export const DeploymentOverviewPure = ({ selectedDeployment,  activePageNumber, numberOfPages, onPaginationPageClicked, participants, showLoading, paginationLoading, match: { params: { datasetId } }, fetchDeploymentById, translations }) => {
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
        setLimit
    },
)(withRouter(enhance(DeploymentOverviewPure)));

export default DeploymentOverview;