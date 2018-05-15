import React from 'react';
import { storiesOf } from '@storybook/react';
import ImportWizard from './ImportWizard';
import { withKnobs, text, select, boolean, number } from '@storybook/addon-knobs/react';
import { RouterContext, StoreContext, translations } from 'Src/tests/contextCreators';

const createComp = (props = {}) => <StoreContext><ImportWizard {...props}/></StoreContext>;

const stories = storiesOf('ImportWizard', module);

stories.addDecorator(withKnobs);

stories
    .add('initial', () => createComp({}))
    .add('file added', () => createComp({ validationReady: true}))
    .add('validating', () => createComp({ validationReady: true, isValidating: true}))
    .add('valid file', () => createComp({ validationReady: true, isValid: true}))
    .add('importing', () => createComp({ validationReady: true, isValid: true, isImporting: true}))
    .add('imported', () => createComp({ validationReady: true, isValid: true, importComplete: true}))

;