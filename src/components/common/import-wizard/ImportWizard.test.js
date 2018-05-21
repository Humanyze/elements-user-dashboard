import React from 'react';
import ImportWizard, { ImportWizardPure } from './ImportWizard';
import { StoreContext } from 'Src/tests/contextCreators';


describe('ImportWizard', () => {
    testRender(ImportWizardPure, { translations: {}})();

    const createComp = (props) => mount(<StoreContext><ImportWizard {...props} /></StoreContext>);

    it ('should should show all ready when default props are passed', () => {
        const props = {
            validationReady: false,
            isValidating: false,
            isValid: false,
            isImporting: false,
            importComplete: false
        };


        const wrapper = createComp(props);
        expect(wrapper.find('.add-to-validate.ready')).toHaveLength(1);
        expect(wrapper.find('.validate-to-import.ready')).toHaveLength(1);
        expect(wrapper.find('.wizard-step.import.ready')).toHaveLength(1);
    });

    it ('should should show validate ready when is ready', () => {
        const props = {
            validationReady: true,
            isValidating: false,
            isValid: false,
            isImporting: false,
            importComplete: false
        };


        const wrapper = createComp(props);
        expect(wrapper.find('.add-to-validate.succeeded')).toHaveLength(1);
        expect(wrapper.find('.wizard-step.add.succeeded')).toHaveLength(1);
        expect(wrapper.find('.validate-to-import.ready')).toHaveLength(1);
        expect(wrapper.find('.wizard-step.import.ready')).toHaveLength(1);
    });

    it ('should should show validating when is request is out', () => {
        const props = {
            validationReady: true,
            isValidating: true,
            isValid: false,
            isImporting: false,
            importComplete: false
        };


        const wrapper = createComp(props);
        expect(wrapper.find('.add-to-validate.succeeded')).toHaveLength(1);
        expect(wrapper.find('.wizard-step.add.succeeded')).toHaveLength(1);
        expect(wrapper.find('.wizard-step.validate.running')).toHaveLength(1);
        expect(wrapper.find('.validate-to-import.running')).toHaveLength(1);
        expect(wrapper.find('.wizard-step.import.ready')).toHaveLength(1);
    });

    it ('should should show import ready when is validated', () => {
        const props = {
            validationReady: true,
            isValidating: false,
            isValid: true,
            isImporting: false,
            importComplete: false
        };


        const wrapper = createComp(props);
        expect(wrapper.find('.add-to-validate.succeeded')).toHaveLength(1);
        expect(wrapper.find('.wizard-step.add.succeeded')).toHaveLength(1);
        expect(wrapper.find('.wizard-step.validate.succeeded')).toHaveLength(1);
        expect(wrapper.find('.validate-to-import.succeeded')).toHaveLength(1);
        expect(wrapper.find('.wizard-step.import.ready')).toHaveLength(1);
    });


    it ('should should show importing when request is out', () => {
        const props = {
            validationReady: true,
            isValidating: false,
            isValid: true,
            isImporting: true,
            importComplete: false
        };


        const wrapper = createComp(props);
        expect(wrapper.find('.add-to-validate.succeeded')).toHaveLength(1);
        expect(wrapper.find('.wizard-step.add.succeeded')).toHaveLength(1);
        expect(wrapper.find('.wizard-step.validate.succeeded')).toHaveLength(1);
        expect(wrapper.find('.validate-to-import.succeeded')).toHaveLength(1);
        expect(wrapper.find('.wizard-step.import.running')).toHaveLength(1);
    });


    it ('should should show import successful when valid and imported', () => {
        const props = {
            validationReady: true,
            isValidating: false,
            isValid: true,
            isImporting: false,
            importComplete: true
        };


        const wrapper = createComp(props);
        expect(wrapper.find('.add-to-validate.succeeded')).toHaveLength(1);
        expect(wrapper.find('.wizard-step.add.succeeded')).toHaveLength(1);
        expect(wrapper.find('.wizard-step.validate.succeeded')).toHaveLength(1);
        expect(wrapper.find('.validate-to-import.succeeded')).toHaveLength(1);
        expect(wrapper.find('.wizard-step.import.succeeded')).toHaveLength(1);
    });
});