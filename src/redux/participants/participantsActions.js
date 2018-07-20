import { createAction } from 'redux-actions';
import PARTICIPANTS_ACTION_TYPES from './participantsActionTypes';

const participantsFetchStarted = createAction(PARTICIPANTS_ACTION_TYPES.LOAD_PARTICIPANTS_REQUESTED, payload => payload);
const participantsFetchSuccess = createAction(PARTICIPANTS_ACTION_TYPES.LOAD_PARTICIPANTS_SUCCESS, data => data);
const participantsFetchError = createAction(PARTICIPANTS_ACTION_TYPES.LOAD_PARTICIPANTS_ERROR, error => error);

const cancelParticipantDataRequests = createAction(PARTICIPANTS_ACTION_TYPES.LOAD_PARTICIPANTS_CANCELLED);

const requestParticipantsData = (datasetId, perPage = 20, page = 1) => participantsFetchStarted({ datasetId, perPage, page });


export {
    requestParticipantsData,
    participantsFetchStarted,
    participantsFetchSuccess,
    participantsFetchError,
    cancelParticipantDataRequests
};
