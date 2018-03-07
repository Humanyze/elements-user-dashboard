import {handleActions} from 'redux-actions';
import DEPLOYMENT_ACTION_TYPES from './deploymentActionTypes';
import USER_ACTION_TYPES from '../userData/user/userActionTypes';
import _ from 'lodash';

const initialState = {
    selectedDeploymentId: null,
    deploymentDataSetIds: null, // int[], duplicated in user.user.deploymentDataSetIds
    fetching: false,
    deploymentsById: {}
};


const deploymentReducer = handleActions({
    [USER_ACTION_TYPES.USER_DATA_FETCH_SUCCESSFUL]: (state, action) => ({
        ...state,
        deploymentDataSetIds: action.payload.deploymentDataSetIds
    }),
    [DEPLOYMENT_ACTION_TYPES.DEPLOYMENTS_DATA_REQUESTED]: (state, action) => ({
        ...state,
        fetching: true
    }),
    [DEPLOYMENT_ACTION_TYPES.DEPLOYMENTS_DATA_SUCCESSFUL]: (state, action) => ({
        ...state,
        deploymentsById: action.payload,
        fetching: false
    }),
    [DEPLOYMENT_ACTION_TYPES.SET_SELECTED_DEPLOYMENT_ID]: (state, action) => ({
        ...state,
        selectedDeploymentId: action.payload
    })
}, initialState);

export default deploymentReducer;


export const getSelectedDeployment = (state) => {
    console.log(state);
    return state.deployment.deploymentsById[state.deployment.selectedDeploymentId];
}