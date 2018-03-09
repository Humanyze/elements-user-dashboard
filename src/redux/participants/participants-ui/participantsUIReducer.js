import { handleActions } from 'redux-actions';


export const initialState = {
    limit: 20,
};


const participantsUIReducer = handleActions({

}, initialState);
export default participantsUIReducer;