import React from 'react';
import './pagination.scss';
import { connect } from 'react-redux';
import { compose, withHandlers, withPropsOnChange } from 'recompose';
import { setPage } from 'Redux/participants-ui/participantsUIActions';
import { getCurrentPageNumber, getTotalPageCount } from 'Redux/participants-ui/participantsUIReducer';


export const getArrayFromStartEndIndex = (startIndex, endIndex) => Array.from({ length: (endIndex - startIndex + 1) }, (x, i) => startIndex + i);

export const getVisiblePageList = (activeIndex, numberOfPages, visiblePageLimit = 9) => {
    const offset = Math.floor(visiblePageLimit / 2);

    if (numberOfPages < visiblePageLimit) {
        return getArrayFromStartEndIndex(1, numberOfPages);

    } else if (offset > activeIndex) {
        return getArrayFromStartEndIndex(1, visiblePageLimit);

    } else if (offset > (numberOfPages - activeIndex)) {
        return getArrayFromStartEndIndex(numberOfPages - visiblePageLimit + 1, numberOfPages);

    }
    return getArrayFromStartEndIndex(activeIndex - offset, activeIndex + offset);
};


const onPreviousPageClicked = ({ activePageNumber, setPage }) => () => {
    setPage(activePageNumber - 1);
};

const onNextPageClicked = ({ activePageNumber, setPage }) => () => {
    setPage(activePageNumber + 1);
};


const enhance = compose(
    withPropsOnChange(
        ['activePageNumber', 'numberOfPages'],
        ({ activePageNumber, numberOfPages }) => ({
            canClickPrev: activePageNumber !== 1,
            canClickNext: activePageNumber !== numberOfPages
        })
    ),
    withHandlers({
        onPreviousPageClicked,
        onNextPageClicked
    })
);


export const PaginationPure = ({
                                   activePageNumber, numberOfPages,
                                   onPreviousPageClicked, onNextPageClicked,
                                   canClickPrev, canClickNext,
                                   visiblePageCount = 9 // TODO: move to withProps
                               }) => {

    const pages = getVisiblePageList(activePageNumber, numberOfPages, visiblePageCount);
    return (
        <div className='Pagination'>

            <button onClick={onPreviousPageClicked}
                 className={ `Pagination__button ${canClickPrev ? '' : 'disabled'}`}>
                Prev
            </button>

            {pages.map((pageNumber) => (
                <div key={pageNumber}
                     className={pageNumber === activePageNumber ? 'active' : 'inactive'}>
                    {pageNumber}
                </div>
            ))}

            <button onClick={onNextPageClicked}
                 className={ `Pagination__button ${canClickNext ? '' : 'disabled'}`}>
                Next
            </button>
        </div>
    );
};


const Pagination = connect(
    state => ({
        activePageNumber: getCurrentPageNumber(state),
        numberOfPages   : getTotalPageCount(state)
    }),
    { setPage }
)(enhance(PaginationPure));


export default Pagination;
