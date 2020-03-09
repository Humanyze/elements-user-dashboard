import React from 'react';
import { storiesOf } from '@storybook/react';

import SegmentsTable from './SegmentsTable';
import { translations } from 'Src/tests/contextCreators';

export const defaultProps = {
    translations: translations,
    showLoading: false,
    segments: null,
};

const onLoad = {
    showLoading:  true
};

export const withSegments = {
    showLoading: false,
    segments: [
    {
        "id": 27,
        "name": "test_engagement",
        "company": 6,
        "start_date": "2019-06-01",
        "end_date": "2019-06-30",
        "created_at": "2019-12-17T19:51:19.806201Z",
        "creator_id": 3,
        "status": "pending",
        "participant_count": 74
    },
    {
        "id": 28,
        "name": "test_engagement_4000",
        "company": 6,
        "start_date": "2019-06-01",
        "end_date": "2019-06-30",
        "created_at": "2019-12-17T21:23:56.165589Z",
        "creator_id": 3,
        "status": "pending",
        "participant_count": 0
    },
    {
        "id": 29,
        "name": "small_engagement",
        "company": 6,
        "start_date": "2019-06-01",
        "end_date": "2019-06-30",
        "created_at": "2019-12-18T20:10:42.436804Z",
        "creator_id": 3,
        "status": "pending",
        "participant_count": 0
    },
    {
        "id": 30,
        "name": "humanyze_engagement",
        "company": 6,
        "start_date": "2019-06-01",
        "end_date": "2019-06-30",
        "created_at": "2020-01-22T18:54:21.962258Z",
        "creator_id": 3,
        "status": "pending",
        "participant_count": 80
    },
    {
        "id": 31,
        "name": "small_others_test",
        "company": 6,
        "start_date": "2019-06-01",
        "end_date": "2019-06-30",
        "created_at": "2020-01-23T18:17:30.043276Z",
        "creator_id": 3,
        "status": "pending",
        "participant_count": 0
    },
    {
        "id": 32,
        "name": "small_others_test2",
        "company": 6,
        "start_date": "2019-06-01",
        "end_date": "2019-06-30",
        "created_at": "2020-01-24T20:32:09.892688Z",
        "creator_id": 3,
        "status": "pending",
        "participant_count": 5
    }
]};

export const createComp = (props) => {
    return (
        <SegmentsTable {...defaultProps} {...props}/>
    );
};

storiesOf('Segments Table', module)
    .add('loading', () => createComp(onLoad))
    .add('loaded', () => createComp(withSegments));
