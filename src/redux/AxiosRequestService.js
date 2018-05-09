import axios from 'axios/index';
import { parseDataSetsFromRoles } from 'Src/redux/userData/user/userResponseMapper';

export const postRequest = async (url, data) => await axios.post(url,
    { ...data },
    {
        cache      : 'no-cache',
        credentials: 'same-origin',
        headers    : {
            'content-type': 'application/json'
        },
        method     : 'POST',
        mode       : 'cors',
        redirect   : 'follow',
        referrer   : 'no-referrer'
    }
);


export const getRequestWithAuth = async (url, bearerToken) => {
    if (!bearerToken) {
        console.error('unauthorized');
        return;
    }
    return await axios.get(url, {
        method : 'GET',
        headers: {
            Authorization: `Bearer ${bearerToken}`
        }
    });
};

export const postWithAuth = async (url, data, bearerToken, headers = {}) => {
    return await axios.post(url,
        data,
        {
            headers    : {
                Authorization: `Bearer ${bearerToken}`
            },
            cache      : 'no-cache',
            credentials: 'same-origin',
            method     : 'POST',
            mode       : 'cors',
            redirect   : 'follow',
            referrer   : 'no-referrer',
            ...headers
        });
};


// AUTH ENDPOINTS
const login = ({ username, password }) => postRequest('/api/v1/login', { username, password });
const logout = () => postRequest('/api/v1/logout');



// USER ENDPOINTS
const getUserById = async (id, token) => await getRequestWithAuth(`/api/v1/user/${id}/`, token);




// PARTICIPANT(S) ENDPOINTS
const getParticipantDataById = async (id, token) => await getRequestWithAuth(`/api/v1/participant/?user=${id}`, token);
const getParticipantsByDatasetId = async (datasetId, { perPage = 20, offset = 0 }, token) => await getRequestWithAuth(`/api/v2/participants?dataset_id=${datasetId}&limit=${perPage}&offset=${offset}`, token);
const getAllParticipantsByDatasetId = async (datasetId, token) => await getRequestWithAuth(`/api/v2/participants?dataset_id=${datasetId}`, token);




// DATASET ENDPOINTS
const getDatasetById = (id, token) => getRequestWithAuth(`/api/v1/dataset/${id}/`, token);
const getExportedParticipantsByDatasetId = async (datasetId, token) => await getRequestWithAuth(`/api/v1/dataset/${datasetId}/export_participants`, token);

const validateParticipantDataset = async (datasetId, file, token) => {
    const data = new FormData();
    data.append('file', file);
    return await postWithAuth(`/api/v1/dataset/${datasetId}/import_participants/validate`, data, token, {
        'Content-Type': 'multipart/form-data'
    });
};

const uploadParticipantDataset = async (datasetId, file, effectiveDate, token) => {
    const data = new FormData();
    data.append('file', file);
    data.append('effective_date', effectiveDate);
    return await postWithAuth(`/api/v1/dataset/${datasetId}/import_participants`, data, token, {
        'Content-Type': 'multipart/form-data'
    });
};

const pollParticipantImportStatus = async (datasetId, uuid, token) => await getRequestWithAuth(`/api/v1/dataset/${datasetId}/import_participants/status?uuid=${uuid}`, token);
const cancelParticipantImport = async (datasetId, uuid, token) => await postWithAuth(`/api/v1/dataset/${datasetId}/import_participants/cancel`, { uuid: uuid }, token);


// NOTE: Not actual service, object containing api calls in organized layout
const AxiosRequestService = {
    auth        : {
        login,
        logout
    },
    user        : {
        getUserById
    },
    participants: {
        getParticipantDataById,
        getParticipantsByDatasetId,
        getAllParticipantsByDatasetId,
        cancelParticipantImport
    },
    datasets    : {
        getDatasetById,
        getExportedParticipantsByDatasetId,
        validateParticipantDataset,
        uploadParticipantDataset,
        pollParticipantImportStatus,
        cancelParticipantImport
    }
};
export default AxiosRequestService;
