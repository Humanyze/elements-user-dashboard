import Pagination, { getArrayFromStartEndIndex } from './Pagination';

// testRender(Pagination)();


describe('Pagination', () => {

    describe('getVisiblePageList', () => {

    });


    describe('getArrayFromStartEndIndex', () => {
        it('should handle single value', () => {
            const array = getArrayFromStartEndIndex(1, 1);
            expect(array).toEqual([1]);
        });

        it('should return expected array from standard input', () => {
           const array = getArrayFromStartEndIndex(1, 5);
           expect(array).toEqual([1, 2, 3, 4, 5]);
        });


        it('should return expected array from other standard input', () => {
            const array = getArrayFromStartEndIndex(4, 10);
            expect(array).toEqual([4, 5, 6, 7, 8, 9, 10]);
        });
    });
});