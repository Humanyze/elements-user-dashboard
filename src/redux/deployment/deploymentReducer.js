import { handleActions } from 'redux-actions';
import DEPLOYMENT_ACTION_TYPES from './deploymentActionTypes';
import USER_ACTION_TYPES from '../userData/user/userActionTypes';
import { createSelector } from 'reselect';


const getSelectedDeployment = (state) => state.deployment.deploymentsById[state.deployment.selectedDeploymentId];

const getSelectedDeploymentName = createSelector(
    getSelectedDeployment,
    (selectedDeployment) => {
        return selectedDeployment && selectedDeployment.name;
    }
);

const getSelectedDeploymentId = createSelector(
    getSelectedDeployment,
    (selectedDeployment) => selectedDeployment && selectedDeployment.id
);

const getSelectedDeploymentStartDate = createSelector(
  getSelectedDeployment,
    (selectedDeployment) => selectedDeployment && selectedDeployment.start_date
);

const getSelectedDeploymentEndDate = createSelector(
    getSelectedDeployment,
    (selectedDeployment) => selectedDeployment && ( selectedDeployment.end_date || new Date())
);

const getAllDeployments = (state) => Object.values(state.deployment.deploymentsById);

const initialState = {
    selectedDeploymentId: null,
    deploymentDataSetIds: null, // int[], duplicated in user.user.deploymentDataSetIds
    requestPending      : false,
    deploymentsById     : {}
};

const deploymentReducer = handleActions({
    [USER_ACTION_TYPES.USER_DATA_FETCH_SUCCESSFUL]       : (state, action) => ({
        ...state,
        deploymentDataSetIds: action.payload.deploymentDataSetIds
    }),
    [DEPLOYMENT_ACTION_TYPES.DEPLOYMENTS_DATA_REQUESTED] : (state, action) => ({
        ...state,
        requestPending: true
    }),
    [DEPLOYMENT_ACTION_TYPES.DEPLOYMENTS_DATA_SUCCESSFUL]: (state, action) => ({
        ...state,
        deploymentsById: action.payload,
        requestPending : false
    }),
    [DEPLOYMENT_ACTION_TYPES.DEPLOYMENT_FETCH_SUCCESSFUL]: (state, action) => {
        return ({
            ...state,
            deploymentsById: {
                ...state.deploymentsById,
                [action.payload.id]: action.payload
            },
            requestPending: false
        });
    },
    [DEPLOYMENT_ACTION_TYPES.SET_SELECTED_DEPLOYMENT_ID] : (state, action) => ({
        ...state,
        selectedDeploymentId: action.payload
    })
}, initialState);


export default deploymentReducer;

export {
    getSelectedDeployment,
    getSelectedDeploymentName,
    getSelectedDeploymentId,
    getAllDeployments,
    getSelectedDeploymentStartDate,
    getSelectedDeploymentEndDate,
    initialState
};