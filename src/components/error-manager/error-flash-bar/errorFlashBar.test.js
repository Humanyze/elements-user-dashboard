import { ErrorFlashBarPure } from './errorFlashBar';


const mockProps = {
    error: {
        id: 5,
        message: '45'
    }
};


describe('errorFlashBar', () => {
    // todo: add error reducer tests after finalization
    testRender(ErrorFlashBarPure, mockProps)();
});