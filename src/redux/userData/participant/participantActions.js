import { createAction } from 'redux-actions';
import AxiosRequestService from '../../AxiosRequestService';
import PARTICIPANT_ACTION_TYPES from './participantActionTypes';
import { getBearerToken } from '../../auth/authReducer';

const participantDataFetchRequested = createAction(PARTICIPANT_ACTION_TYPES.PARTICIPANT_DATA_FETCH_REQUESTED);
const participantDataFetchSuccessful = createAction(PARTICIPANT_ACTION_TYPES.PARTICIPANT_DATA_FETCH_SUCCESSFUL, participantData => participantData);
const participantDataFetchFailed = createAction(PARTICIPANT_ACTION_TYPES.PARTICIPANT_DATA_FETCH_FAILED, error => error);


const setParticipantDataById = (id) => async (dispatch, getState) => {
    dispatch(participantDataFetchRequested());
    try {
        //    get participant data
        const bearerToken = getBearerToken(getState());
        const  { data } = await AxiosRequestService.participants.getParticipantDataById(id, bearerToken);
        dispatch(participantDataFetchSuccessful(...data.participants));
    } catch (e) {
        dispatch(participantDataFetchFailed(e));
    }
};


export {
    setParticipantDataById,
    participantDataFetchRequested,
    participantDataFetchSuccessful,
    participantDataFetchFailed
};
