import { combineEpics } from 'redux-observable';
import metricDataEpic from './common/metric/metricDataEpics';
const rootEpic = combineEpics(
    metricDataEpic
);

export default rootEpic;
