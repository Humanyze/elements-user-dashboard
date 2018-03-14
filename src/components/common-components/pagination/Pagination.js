import React from 'react';
import './pagination.scss';



export const getArrayFromStartEndIndex = (startIndex, endIndex) => Array.from({ length: (endIndex - startIndex + 1) }, (x, i) => startIndex + i);

export const getVisiblePageList = (activeIndex, numberOfPages, visiblePageLimit = 9) => {
    const offset = Math.floor(visiblePageLimit/2);

    if (numberOfPages < visiblePageLimit) {
        return getArrayFromStartEndIndex(1, numberOfPages);

    } else if (offset > activeIndex) {
        return getArrayFromStartEndIndex(1, visiblePageLimit);

    } else if (offset > (numberOfPages - activeIndex)) {
        return getArrayFromStartEndIndex(numberOfPages - visiblePageLimit + 1, numberOfPages);

    }
    return getArrayFromStartEndIndex(activeIndex - offset, activeIndex + offset);
};




// NOTE: Active page starts at 1 for display reasons
export const PaginationPure = ({ activePageNumber, numberOfPages }) => {

    const visiblePageCount = 9;

    const pages = getVisiblePageList(activePageNumber, numberOfPages, visiblePageCount);

    return (
        <div className='Pagination'>
            <div> Prev </div>
            <div> Next </div>
            {pages.map((pageNumber) => {
                console.log(pageNumber, activePageNumber);
                return <div key={pageNumber}
                            className={pageNumber === activePageNumber ? 'active' : 'inactive'}>{pageNumber}</div>;
            })}
        </div>
    );
};


const Pagination = PaginationPure;
export default Pagination;
