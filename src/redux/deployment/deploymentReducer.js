import {handleActions} from 'redux-actions';
import DEPLOYMENT_ACTION_TYPES from './deploymentActionTypes';
import USER_ACTION_TYPES from '../userData/user/userActionTypes';




const getSelectedDeployment = (state) => {
    return state.deployment.deploymentsById[state.deployment.selectedDeploymentId];
};

const getAllDeployments = (state) => Object.values(state.deployment.deploymentsById);

const initialState = {
    selectedDeploymentId: null,
    deploymentDataSetIds: null, // int[], duplicated in user.user.deploymentDataSetIds
    requestPending: false,
    deploymentsById: {}
};

const deploymentReducer = handleActions({
    [USER_ACTION_TYPES.USER_DATA_FETCH_SUCCESSFUL]: (state, action) => ({
        ...state,
        deploymentDataSetIds: action.payload.deploymentDataSetIds
    }),
    [DEPLOYMENT_ACTION_TYPES.DEPLOYMENTS_DATA_REQUESTED]: (state, action) => ({
        ...state,
        requestPending: true
    }),
    [DEPLOYMENT_ACTION_TYPES.DEPLOYMENTS_DATA_SUCCESSFUL]: (state, action) => ({
        ...state,
        deploymentsById: action.payload,
        requestPending: false
    }),
    [DEPLOYMENT_ACTION_TYPES.SET_SELECTED_DEPLOYMENT_ID]: (state, action) => ({
        ...state,
        selectedDeploymentId: action.payload
    })
}, initialState);


export default deploymentReducer;

export {
    getSelectedDeployment,
    getAllDeployments,
    initialState
}