import React from 'react';
import ActionSubBar from './action-sub-bar/ActionSubBar';
import ParticipantsTable from './participants-table/ParticipantsTable';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { withRouter } from 'react-router';


import { getSelectedDeployment } from 'Redux/deployment/deploymentReducer';
import { setSelectedDeploymentId } from 'Redux/deployment/deploymentActions';
import { requestParticipantsData } from 'Redux/participants/participantsActions';
import { getAllParticipants } from 'Redux/participants/participantsReducer';
import { fetchDeploymentById } from 'Redux/deployment/deploymentActions';


const withDidMount = lifecycle({
    componentWillMount() {
        const { match: { params: { datasetId, perPage, page } } } = this.props;
        this.props.requestParticipantsData(datasetId, perPage, page);
        this.props.setSelectedDeploymentId(datasetId);

    }

});

const enhance = compose(
    withDidMount
);

export const DeploymentOverviewPure = ({ selectedDeployment, participants, showLoading, match: { params: { datasetId, perPage, page } }, setSelectedDeploymentId, fetchDeploymentById, requestParticipantsData }) => {
    if (!selectedDeployment && !showLoading) {
        fetchDeploymentById(datasetId);
    }

    return (
        <div>
            <ActionSubBar/>
            <ParticipantsTable participants={participants} showLoading={showLoading}/>
        </div>
    );
};

const DeploymentOverview = connect(
    (state) => ({
        selectedDeployment  : getSelectedDeployment(state),
        participants: getAllParticipants(state),
        showLoading : state.participants.requestPending || state.deployment.requestPending

    }),
    { setSelectedDeploymentId, requestParticipantsData, fetchDeploymentById }
)(withRouter(enhance(DeploymentOverviewPure)));

export default DeploymentOverview;