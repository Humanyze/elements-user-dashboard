import {combineReducers} from 'redux';
import modalReducer from './modal/modalReducer';


const RootReducer = combineReducers({
    modal: modalReducer
});


export default RootReducer;