import {applyMiddleware, createStore} from 'redux';
import { createLogger } from "redux-logger";
import rootReducer from "./rootReducer";

const logger = createLogger({
});

const customCreateStore = () => createStore(rootReducer, applyMiddleware(logger));

export default customCreateStore;