import { getAuthInfo } from '../auth/authReducer';
import { setUserDataById } from './user/userActions';
import { setParticipantDataById } from './participant/participantActions';

export const setUserDataByAuthId = () => (dispatch, getStore) => {
    const { user_id } = getAuthInfo(getStore());
    dispatch(setUserDataById(user_id));
    dispatch(setParticipantDataById(user_id));
};