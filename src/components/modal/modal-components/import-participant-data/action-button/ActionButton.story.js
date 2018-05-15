import React from 'react';
import { storiesOf } from '@storybook/react';
import ActionButton  from './ActionButton';
import { withKnobs, text, select, boolean, number } from '@storybook/addon-knobs/react';
import { RouterContext, StoreContext } from 'Src/tests/contextCreators';


const createComp = (props = {}) => <StoreContext>
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    }}>
        <ActionButton {...props}/>
    </div>
</StoreContext>;

const stories = storiesOf('ActionButton', module);

stories.addDecorator(withKnobs);

stories
    .add('initial', () => createComp({
        text: text('Button Text', 'Validate'),
        theme: select('Themes', {
            ['default']: 'Default',
            ['blue']: 'Blue Theme'
        }, 'default')
    }));