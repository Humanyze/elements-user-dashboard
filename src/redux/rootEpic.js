import { combineEpics } from 'redux-observable';
import { elementsRedux } from 'ElementstWebCommon';

const { metricDataEpic }  = elementsRedux;

const rootEpic = combineEpics(
    metricDataEpic
);

export default rootEpic;
