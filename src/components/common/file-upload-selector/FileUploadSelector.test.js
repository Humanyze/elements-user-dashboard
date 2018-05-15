import React from 'react';
import { FileUploadSelectorPure } from './fileUploadSelector';
import { mount } from 'enzyme/build/index';

describe('fileUploadSelector', () => {


    const defaultProps = {
        translations: {},
        fileIsSelected: false,
        fileName: null,
        onFileChange: () => {},
        acceptedFileTypes: ['xls']
    };

    testRender(FileUploadSelectorPure, defaultProps)();

    it('should should show the select file prompt if no file is selected', () => {
        const component = mount(<FileUploadSelectorPure {...defaultProps}/>);
        expect(component.find('.FileUploadSelector__select-file')).toHaveLength(1);
    });


    it('should should show the filename if file is selected', () => {
        const component = mount(<FileUploadSelectorPure {...defaultProps} fileIsSelected={true} fileName='testing'/>);
        expect(component.find('.FileUploadSelector__file-name')).toHaveLength(1);
    });
});

