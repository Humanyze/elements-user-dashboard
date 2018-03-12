import Pagination, {getVisiblePageList,getArrayFromStartEndIndex } from './Pagination';

// testRender(Pagination)();


describe('Pagination', () => {
    const defaultProps = {
        activeIndex  : undefined,
        numberOfPages: undefined
    };

    const simpleProps = {
        activeIndex  : 2,
        numberOfPages: 5
    };


    const largePagesEarlyProps = {
        activeIndex  : 0,
        numberOfPages: 50
    };


    const largePagesMiddleProps = {
        activeIndex  : 25,
        numberOfPages: 50
    };
    const largePagesEndProps = {
        activeIndex  : 49,
        numberOfPages: 50
    };


    describe('getVisiblePageList', () => {
        const visiblePageLimit = 9;

        it('should return an array of 1 to the last page if number of pages is less than visiblePageLimit', () => {
            const lastPage = visiblePageLimit - 2;
            const pageList = getVisiblePageList(1, lastPage);
            // expected [1...7], 9 items
            console.error(lastPage, pageList.length);
            expect(pageList[0]).toEqual(1);
            expect([...pageList].splice(-1)[0]).toEqual(lastPage);
            expect(pageList.length).toEqual(lastPage);
        });

        it('should return an array of 1 to the visiblePageLimit if the number is large and active is less than half of visibleLimit', () => {
            const pageList = getVisiblePageList(2, 100);
            // expected [1...9], 9 items
            expect(pageList[0]).toEqual(1);
            expect([...pageList].splice(-1)[0]).toEqual(visiblePageLimit);
            expect(pageList.length).toEqual(visiblePageLimit);
        });

        it('should properly crop list if many pages and active page is in the middle', () => {
            const pageList = getVisiblePageList(25, 100);
            // expected [21...29], 9 items
            expect(pageList[0]).toEqual(25 - Math.floor(visiblePageLimit / 2));
            expect([...pageList].splice(-1)[0]).toEqual(25 + Math.floor(visiblePageLimit / 2));
            expect(pageList.length).toEqual(visiblePageLimit);
        });

        it('should have off balance list if active page is towards end of large number of pages', () => {
            const pageList = getVisiblePageList(49, 50);
            // expected [42...50], 9 items
            expect(pageList[0]).toEqual(50 - visiblePageLimit + 1);
            expect([...pageList].splice(-1)[0]).toEqual(50);
            expect(pageList.length).toEqual(visiblePageLimit);
        });


    });

    describe('getArrayFromStartEndIndex', () => {
        it('should handle single value', () => {
            const array = getArrayFromStartEndIndex(1, 1);
            expect(array).toEqual([1]);
        })

        it('should return expected array from standard input', () => {
           const array = getArrayFromStartEndIndex(1, 5);
           expect(array).toEqual([1, 2, 3, 4, 5]);
        });


        it('should return expected array from other standard input', () => {
            const array = getArrayFromStartEndIndex(4, 10);
            expect(array).toEqual([4, 5, 6, 7, 8, 9, 10]);
        });
    })
});