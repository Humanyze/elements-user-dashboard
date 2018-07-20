import { combineEpics } from 'redux-observable';
import participantDataSetEpic from './participants/participantDataSetEpic';

const rootEpic = combineEpics(
    participantDataSetEpic
);

export default rootEpic;
