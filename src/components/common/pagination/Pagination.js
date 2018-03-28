import React from 'react';
import './pagination.scss';

import { connect } from 'react-redux';
import { compose, withHandlers, withPropsOnChange } from 'recompose';
import { getTotalPageCount } from 'Redux/participants/participantsReducer';
import MaterialIcon from 'material-icons-react';
import { withRouter } from 'react-router-dom';
import QueryString from 'query-string';


export const getArrayFromStartEndIndex = (startIndex, endIndex) => Array.from({ length: (endIndex - startIndex + 1) }, (x, i) => startIndex + i);

const getPageNumbers = (numberOfPages, activePageNumber, offset = 3) => {

    const maxPage = Math.min(activePageNumber + offset, numberOfPages - 1);
    const minPage = Math.max(activePageNumber - offset, 2);
    const hiddenStart = minPage > 2;
    const hiddenEnd = maxPage < numberOfPages - 1;

    let PageNumbers = getArrayFromStartEndIndex(minPage, maxPage);

    return { PageNumbers, hiddenStart, hiddenEnd };

};

const goToPage = ({ history, location }) => number => e => {
    const { pathname, search } = location;
    const queryObj = QueryString.parse(search);
    const updatedPageQuery = { ...queryObj, page: number };
    history.push({
        pathname,
        search: QueryString.stringify(updatedPageQuery)
    });
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
        goToPage
    })
);


export const PaginationPure = ({ activePageNumber, goToPage, numberOfPages, canClickPrev, canClickNext }) => {


    const { PageNumbers, hiddenStart, hiddenEnd } = getPageNumbers(numberOfPages, activePageNumber);
    const LinkProps = {
        activePageNumber,
        goToPage
    };

    return (
        <div className='Pagination'>

            <div onClick={goToPage(activePageNumber - 1)} className={`Pagination__nav ${canClickPrev ? '' : 'disabled'}`}>
                <MaterialIcon  icon={'chevron_left'} size={'tiny'}/>
            </div>

            <PaginationNumberLink number={1} {...LinkProps}/>

            {hiddenStart && <Ellipses/>}

            {PageNumbers.map((number) => <PaginationNumberLink number={number} {...LinkProps} key={number}/>)}

            {hiddenEnd && <Ellipses/>}

            {numberOfPages > 1 && <PaginationNumberLink number={numberOfPages} {...LinkProps}/>}

            <div onClick={goToPage(activePageNumber + 1)}  className={`Pagination__nav ${canClickNext ? '' : 'disabled'}`}>
                <MaterialIcon icon={'chevron_right'} size={'tiny'}/>
            </div>
        </div>
    );
};


const Pagination = withRouter(connect(
    state => ({
        numberOfPages: getTotalPageCount(state),

    }),
)(enhance(PaginationPure)));


export default Pagination;


const Ellipses = () => <div className='Pagination__ellipses'>...</div>;

export const PaginationNumberLink = ({ number, activePageNumber, goToPage }) => <div onClick={goToPage(number)}
                                                                                     className={`Pagination__number-link ${ number === activePageNumber ? 'active' : ''}`}>{number}</div>;
