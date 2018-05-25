import { createAction } from 'redux-actions';
import DEPLOYMENT_ACTION_TYPES from './deploymentActionTypes';
import AxiosRequestService from '../AxiosRequestService';
import { getBearerToken } from '../auth/authReducer';
import normalizeArrayById from 'Utils/normalize-array-by-id';
import * as errorActions from 'Src/redux/error/errorActions';
import ErrorMessageTypes from 'Src/redux/error/errorMessageTypes';


export const deploymentsByIdRequested = createAction(DEPLOYMENT_ACTION_TYPES.DEPLOYMENTS_DATA_REQUESTED);
export const deploymentsByIdSuccessful = createAction(DEPLOYMENT_ACTION_TYPES.DEPLOYMENTS_DATA_SUCCESSFUL, byId => byId);

export const setSelectedDeploymentId = createAction(DEPLOYMENT_ACTION_TYPES.SET_SELECTED_DEPLOYMENT_ID, id => id);

export const fetchDeploymentSuccessful = createAction(DEPLOYMENT_ACTION_TYPES.DEPLOYMENT_FETCH_SUCCESSFUL, deployment => deployment);


export const setDeploymentsFromStoreDeploymentIds = () => async (dispatch, getState) => {

    dispatch(deploymentsByIdRequested());

    try {
        const deploymentIds = getState().deployment.deploymentDataSetIds || [];
        const bearerToken = getBearerToken(getState());

        const deploymentsArray = await Promise.all(deploymentIds.map(async (id) => {
            const { data } = await AxiosRequestService.datasets.getDatasetById(id, bearerToken);
            return data;
        }));

        const deploymentsById = normalizeArrayById(deploymentsArray);
        dispatch(deploymentsByIdSuccessful(deploymentsById));

    } catch (e) {
        console.error(e);
        dispatch(errorActions.addFatalError(ErrorMessageTypes.deploymentFetchFailure));
    }
};

export const fetchDeploymentById = (id) => async (dispatch, getState) => {
    dispatch(deploymentsByIdRequested());
    try {
        const bearerToken = getBearerToken(getState());
        const { data } = await AxiosRequestService.datasets.getDatasetById(id, bearerToken);
        dispatch(fetchDeploymentSuccessful(data));
    } catch ({ response }) {
        console.error(response );
        if (response.status === 403) {
            dispatch(errorActions.addFatalError(ErrorMessageTypes.userUnauthorizedFailure));
        } else {
            dispatch(errorActions.addFatalError(ErrorMessageTypes.genericDeploymentFailure));
        }
    }
};
