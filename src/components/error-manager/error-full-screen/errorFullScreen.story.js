import React from 'react';
import { storiesOf } from '@storybook/react';
import { RouterContext, StoreContext } from 'TestUtils/contextCreators.js';

import ErrorFullScreen from './errorFullScreen';
import { translations } from 'Src/tests/contextCreators';

const defaultProps = {
    fatalError: {
        messageTranslationKey: 'errorMessage__userFetchFailure',
        redirectButton: {
            link: '/logout',
            textKey: 'errorMessage__userFetchFailure--button'
        }
    }
};

const onLoad = {
    showLoading: true
};

const onQuickSwitch = {
    paginationLoading: true
};

const normalParticipants = {};

const createComp = (props) =>
    <StoreContext><RouterContext><ErrorFullScreen {...defaultProps} {...props}/></RouterContext></StoreContext>;

storiesOf('Error Full Screen', module)
    .add('example', () => createComp());
