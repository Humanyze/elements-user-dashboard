import axios from 'axios/index';

export const postRequest = async (url, data) => await axios.post(url,
    { ...data },
    {
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
        mode: 'cors',
        redirect: 'follow',
        referrer: 'no-referrer'
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
const getDatasetById = (id, token) =>  getRequestWithAuth(`/api/v1/dataset/${id}/`, token);






// NOTE: Not actual service, object containing api calls in organized layout
const AxiosRequestService = {
    auth: {
        login,
        logout
    },
    user: {
      getUserById
    },
    participants: {
        getParticipantDataById,
        getParticipantsByDatasetId,
        getAllParticipantsByDatasetId
    },
    datasets: {
        getDatasetById
    }
};
export default AxiosRequestService;