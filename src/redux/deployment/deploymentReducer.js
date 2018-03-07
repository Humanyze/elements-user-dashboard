import { handleActions } from 'redux-actions';
import DEPLOYMENT_ACTION_TYPES from './deploymentActionTypes';
import USER_ACTION_TYPES from '../userData/user/userActionTypes';


const initialState = {
    selectedDeploymentId: null,
    deploymentDataSetIds: null, // int[], duplicated in user.user.deploymentDataSetIds
    deploymentsById: {}
};


const deploymentReducer = handleActions({
    [USER_ACTION_TYPES.USER_DATA_FETCH_SUCCESSFUL]: (state, action) => ({
        ...state,
        deploymentDataSetIds: action.payload.deploymentDataSetIds
    }),
    [DEPLOYMENT_ACTION_TYPES.DEPLOYMENTS_DATA_SUCCESSFUL]: (state, action) => ({
        ...state,
        deploymentsById: action.payload
    })
}, initialState);


export default deploymentReducer;