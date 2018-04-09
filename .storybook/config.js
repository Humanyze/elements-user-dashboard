import { configure } from '@storybook/react';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';

const req = require.context('../src/components', true, /\.story\.js$/);

function loadStories() {
    req.keys().forEach(filename => req(filename))
}

configure(loadStories, module);