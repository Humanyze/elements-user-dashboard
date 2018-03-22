import { createAction } from 'redux-actions';
import DEPLOYMENT_ACTION_TYPES from './deploymentActionTypes';
import AxiosRequestService  from '../AxiosRequestService';


export const deploymentsByIdRequested = createAction(DEPLOYMENT_ACTION_TYPES.DEPLOYMENTS_DATA_REQUESTED);
export const deploymentsByIdSuccessful = createAction(DEPLOYMENT_ACTION_TYPES.DEPLOYMENTS_DATA_SUCCESSFUL, byId => byId);
export const setSelectedDeploymentId = createAction(DEPLOYMENT_ACTION_TYPES.SET_SELECTED_DEPLOYMENT_ID, id => id);

export const setDeploymentsFromStoreDeploymentIds = () => async (dispatch, getState) => {

    dispatch(deploymentsByIdRequested());


    try {
        const deploymentIds = getState().deployment.deploymentDataSetIds;
        const bearerToken = getState().auth.tokenObj.access_token; // todo: fix this pattern

        const deploymentsArray = await Promise.all(deploymentIds.map(async (id) => {
            const { data } = await AxiosRequestService.datasets.getDatasetById(id, bearerToken);
            return data;
        }));

        // TODO move this logic to testable function
        const deploymentsById = deploymentsArray.reduce((acc, deployment) => ({
            ...acc,
            [deployment.id]: deployment
        }), {});
        console.error(deploymentsById);
        dispatch(deploymentsByIdSuccessful(deploymentsById));

    } catch (e) {
        console.error(e);
    }
};
