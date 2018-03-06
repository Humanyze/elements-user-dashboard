import {combineReducers} from 'redux';
import userReducer from "./user/userReducer";
import participantReducer from "./participant/participantReducer";


const userDataReducer = combineReducers({
    user: userReducer,
    participant: participantReducer
});

export default userDataReducer ;
