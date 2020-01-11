import { configure } from '@storybook/react';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import requireContext from 'require-context.macro';

const req = requireContext('../src', true, /\.story\.js$/);

function loadStories() {
    req.keys().forEach(filename => req(filename))
}

configure(loadStories, module);
