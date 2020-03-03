import React from 'react';
import { storiesOf } from '@storybook/react';
import { RouterContext, StoreContext } from 'TestUtils/contextCreators.js';
import { ErrorBoundary } from 'ElementsWebCommon';

import SegmentsTable from './SegmentsTable';
import { translations } from 'Src/tests/contextCreators';

const studies = [
    {
        "id": 4,
        "name": "jake_test_1",
        "company": 2,
        "start_date": "2019-07-01",
        "end_date": "2019-07-31",
        "created_at": "2020-02-10T21:45:36.410142Z",
        "creator_id": 3
    },
    {
        "id": 5,
        "name": "jake_test_2",
        "company": 2,
        "start_date": "2019-07-01",
        "end_date": "2019-09-30",
        "created_at": "2020-02-12T00:29:36.506410Z",
        "creator_id": 3
    },
    {
        "id": 6,
        "name": "jake_test_3",
        "company": 2,
        "start_date": "2019-07-01",
        "end_date": "2019-07-10",
        "created_at": "2020-02-12T19:27:39.265175Z",
        "creator_id": 3
    }
];

const defaultProps = {
    translations: translations,
    showLoading: false,
    studies: null,
};

const onLoad = {
    showLoading:  true
};

const onLoaded = {
    studies,
}


const createComp = (props) => {
    return (
        <StoreContext>
            <RouterContext>
                <ErrorBoundary>
                    <SegmentsTable {...defaultProps} {...props}/>
                </ErrorBoundary>
            </RouterContext>
        </StoreContext>
    );
};

storiesOf('Studies Table', module)
    .add('loading', () => createComp(onLoad))
    .add('loaded', () => createComp(onLoaded));
