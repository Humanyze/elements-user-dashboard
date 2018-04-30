import { ErrorFlashBarPure } from './errorFlashBar';


const mockProps = {
    error: {
        id: 5,
        message: '45'
    }
};


describe('errorFlashBar', () => {
    testRender(ErrorFlashBarPure, mockProps)();
});