import { combineEpics } from 'redux-observable';
import { elementsRedux } from 'ElementsWebCommon';

const { metricDataEpic }  = elementsRedux;

const rootEpic = combineEpics(
    metricDataEpic
);

export default rootEpic;
