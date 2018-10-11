import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import createStore from './redux/createStore';

// https://github.com/react-ga/react-ga/issues/133
jest.mock('react-ga');

const { store } = createStore();

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><App/></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});
