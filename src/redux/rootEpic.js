import { combineEpics } from 'redux-observable';
import participantDataSetEpic from './Epics/participantDataSetEpic';

const rootEpic = combineEpics(
    participantDataSetEpic
);

export default rootEpic;
