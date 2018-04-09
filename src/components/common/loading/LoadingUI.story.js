import React from 'react';
import { storiesOf } from '@storybook/react';
import  LoadingUI from './LoadingUI';

const createComp = (props) => <LoadingUI {...props}/>;

storiesOf('Loading UI', module)
    .add('initial', () => createComp());