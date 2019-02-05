import { combineEpics } from 'redux-observable';
import { elementsRedux } from 'elements-web-common';

const { metricDataEpic }  = elementsRedux;

const rootEpic = combineEpics(
    metricDataEpic
);

export default rootEpic;
