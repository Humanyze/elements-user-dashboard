import React from 'react';
import { storiesOf } from '@storybook/react';
import  LoadingSmiley from './LoadingSmiley';
import { withKnobs, select } from '@storybook/addon-knobs/react';

const stories = storiesOf('Loading Smile UI', module);

stories.addDecorator(withKnobs);


const themeOptions = {
    ['null']: 'Light Theme',
    ['humanyze-blue-theme']: 'Blue Theme'
};

stories.add('initial', () => <LoadingSmiley theme={select('Themes', themeOptions, 'lightTheme', 'THEME_ID_1')}/>);