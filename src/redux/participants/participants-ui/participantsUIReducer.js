import { handleActions } from 'redux-actions';


export const initialState = {
    limit: 20,
    page: 1,
    pages: 1
};


const participantsUIReducer = handleActions({

}, initialState);
export default participantsUIReducer;