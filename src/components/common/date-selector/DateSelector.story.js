import React from 'react';
import { storiesOf } from '@storybook/react';
import Moment from 'moment';
import DateSelector  from './DateSelector';
import { withKnobs, text, select, boolean, number } from '@storybook/addon-knobs/react';
import { RouterContext, StoreContext } from 'Src/tests/contextCreators';


const defaultProps = {
};
const createComp = (props = {}) => <StoreContext>
    <div style={{
        padding        : '300px',
        backgroundColor: 'lightblue'
    }}>
        <DateSelector  {...defaultProps} {...props}/>
    </div>
</StoreContext>;

const stories = storiesOf('DateSelector', module);

stories.addDecorator(withKnobs);


stories
    .add('initial', () => createComp({}))
    .add('dateSelected', () => createComp({ date: Moment() }));