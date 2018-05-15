import React from 'react';
import { storiesOf } from '@storybook/react';
import FileUploadSelector, { FileUploadSelectorPure } from './FileUploadSelector';
import { withKnobs, text, select, boolean, number } from '@storybook/addon-knobs/react';
import { RouterContext, StoreContext } from 'Src/tests/contextCreators';


const defaultProps = {
    fileIsSelected   : false,
    fileName         : '',
    onFileChange     : () => {
    },
    acceptedFileTypes: []
};
const createComp = (props = {}) => <StoreContext>
    <div style={{
        padding        : '300px',
        backgroundColor: 'lightblue'
    }}>
        <FileUploadSelector {...defaultProps} {...props}/>
    </div>
</StoreContext>;

const stories = storiesOf('FileUploadSelector', module);

stories.addDecorator(withKnobs);


stories
    .add('initial', () => createComp({}))
    .add('file added', () => createComp({ fileIsSelected: true, fileName: text('File Name', 'Participants.xlsx') }))
    .add('long File name', () => createComp({ fileIsSelected: true, fileName: 'verylongverylongverylongverylongverylongverylongverylongverylong.xlsx'}));