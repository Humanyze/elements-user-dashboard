import {combineReducers} from 'redux';
import modalReducer from './modal/modalReducer';
import participantsReducer from './participants/participantsReducer';


const RootReducer = combineReducers({
    modal: modalReducer,
    participants: participantsReducer
});

export default RootReducer;