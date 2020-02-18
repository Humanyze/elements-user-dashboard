import React from 'react';
import { storiesOf } from '@storybook/react';

import { StoreContext } from '../../../tests/contextCreators';
import EngagementForm from './EngagementForm.js';
import Moment from 'moment';

const DATE_FORMAT = 'YYYY-MM-DD';

const defaultProps= {

};

const createComponent = (props = {}) => {
  return (
    <StoreContext>
        <EngagementForm {...defaultProps} {...props} />
    </StoreContext>
  );
};

storiesOf('Engagement Form', module)
  .add('Create Engagement', () => createComponent())
  .add('Update Engagement', () => createComponent({
    engagement: {
      name: 'Existing Engagement Name',
      start_date: Moment('2020-1-1', DATE_FORMAT),
      end_date: Moment('2020-2-1', DATE_FORMAT),
      id: 20,
      participants: [1,2,3]
    }
  }))
