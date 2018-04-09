import React from 'react';
import { storiesOf } from '@storybook/react';
import { RouterContext, StoreContext } from 'TestUtils/contextCreators.js';
import Header from './Header';


const defaultProps = {};
const createComp = (props) => <StoreContext><RouterContext><Header {...defaultProps} {...props}/></RouterContext></StoreContext>;

storiesOf('Header', module)
    .add('initial', () => createComp());
    