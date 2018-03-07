import {createAction} from 'redux-actions';
import DEPLOYMENT_ACTION_TYPES from './deploymentActionTypes';
import {fetchWithAuth} from "../rootReducer";
import _ from 'lodash';


export const deploymentsByIdRequested = createAction(DEPLOYMENT_ACTION_TYPES.DEPLOYMENTS_DATA_REQUESTED);
export const deploymentsByIdSuccessful = createAction(DEPLOYMENT_ACTION_TYPES.DEPLOYMENTS_DATA_SUCCESSFUL, byId => byId);
export const setSelectedDeploymentId = createAction(DEPLOYMENT_ACTION_TYPES.SET_SELECTED_DEPLOYMENT_ID, id => id);

const setDeploymentsFromStoreDeploymentIds = () => async (dispatch, getState) => {

    dispatch(deploymentsByIdRequested());


    try {
        const deploymentIds = getState().deployment.deploymentDataSetIds;
        const bearerToken = getState().auth.tokenObj.access_token; // temp

        const deploymentsArray = await Promise.all(deploymentIds.map(async (id) => {
            const res = await fetchWithAuth(`/api/v1/dataset/${id}/`, bearerToken);
            return await res.json();
        }));

        const deploymentsById = deploymentsArray.reduce((acc, deployment) => ({
            ...acc,
            [deployment.id]: deployment
        }), {});
        dispatch(deploymentsByIdSuccessful(deploymentsById));

    } catch (e) {
        console.error(e);
    }
};

export {
    setDeploymentsFromStoreDeploymentIds
}