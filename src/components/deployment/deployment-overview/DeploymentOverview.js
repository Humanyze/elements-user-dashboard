import React from 'react';
import ActionSubBar from '../../action-sub-bar/ActionSubBar';
import ParticipantsTable from './participants-table/ParticipantsTable';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { withRouter } from 'react-router';


import { getSelectedDeployment } from 'Redux/deployment/deploymentReducer';
import { setSelectedDeploymentId } from 'Redux/deployment/deploymentActions';
import { requestParticipantsData } from 'Redux/participants/participantsActions';
import { getAllParticipants } from 'Redux/participants/participantsReducer';


const withDidMount = lifecycle({
    componentWillMount() {
        if (!this.props.deployment || true) {
            const {
                setSelectedDeploymentId,
                requestParticipantsData,
                match: {
                    params: {
                        datasetId,
                        perPage,
                        page
                        //add pagination here
                    }
                }
            } = this.props;

            setSelectedDeploymentId(datasetId);
            requestParticipantsData(datasetId, perPage, page);
        }
    }

});


const enhance = compose(
    withDidMount
);

export const DeploymentOverviewPure = ({ participants, match: { params } }) => {
    return (
        <div>
            <ActionSubBar/>
            {/* ADD SEARCH BAR HERE */}
            <ParticipantsTable participants={participants}/>
        </div>
    );
};

const DeploymentOverview = connect(
    (state) => ({
        deployment  : getSelectedDeployment(state),
        participants: getAllParticipants(state)
    }),
    { setSelectedDeploymentId, requestParticipantsData }
)(withRouter(enhance(DeploymentOverviewPure)));

export default DeploymentOverview;