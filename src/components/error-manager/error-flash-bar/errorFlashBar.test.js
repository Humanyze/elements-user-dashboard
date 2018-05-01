import { ErrorFlashBarPure } from './errorFlashBar';


const mockProps = {
    error: {
        id: 5,
        message: '45',
        messageTranslationKey: 'errorMessage__participantExportFailure',

    },
    translations: {}
};


describe('errorFlashBar', () => {
    testRender(ErrorFlashBarPure, mockProps)();
});