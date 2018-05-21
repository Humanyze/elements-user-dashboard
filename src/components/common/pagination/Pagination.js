import React from 'react';
import { compose, withPropsOnChange } from 'recompose';
import MaterialIcon from 'material-icons-react';
import { withRouter } from 'react-router-dom';

import './pagination.scss';
import classNames from 'classnames';

export const getArrayFromStartEndIndex = (startIndex, endIndex) => Array.from({ length: (endIndex - startIndex + 1) }, (x, i) => startIndex + i);

const getPageNumbers = (numberOfPages, activePageNumber, offset = 3) => {

    const maxPage = Math.min(activePageNumber + offset, numberOfPages - 1);
    const minPage = Math.max(activePageNumber - offset, 2);
    const hiddenStart = minPage > 2;
    const hiddenEnd = maxPage < numberOfPages - 1;

    let PageNumbers = getArrayFromStartEndIndex(minPage, maxPage);

    return { PageNumbers, hiddenStart, hiddenEnd };

};

const enhance = compose(
    withPropsOnChange(
        ['activePageNumber', 'numberOfPages'],
        ({ activePageNumber, numberOfPages }) => ({
            canClickPrev: activePageNumber !== 1,
            canClickNext: activePageNumber !== numberOfPages
        })
    )
);


export const PaginationPure = ({ activePageNumber, onPaginationPageClicked, numberOfPages, canClickPrev, canClickNext }) => {


    const { PageNumbers, hiddenStart, hiddenEnd } = getPageNumbers(numberOfPages, activePageNumber);

    const LinkProps = {
        activePageNumber,
        onPaginationPageClicked
    };

    return (
        <div className='Pagination'>

            <div onClick={onPaginationPageClicked(activePageNumber - 1)}
                 className={classNames('Pagination__nav', { 'disabled': !canClickPrev })}>
                <MaterialIcon icon={'chevron_left'} size={'tiny'}/>
            </div>

            <PaginationNumberLink number={1} {...LinkProps}/>

            {hiddenStart && <Ellipses/>}

            {PageNumbers.map((number) => <PaginationNumberLink number={number} {...LinkProps} key={number}/>)}

            {hiddenEnd && <Ellipses/>}

            {numberOfPages > 1 && <PaginationNumberLink number={numberOfPages} {...LinkProps}/>}

            <div onClick={onPaginationPageClicked(activePageNumber + 1)}
                 className={classNames('Pagination__nav', { 'disabled': !canClickNext })}>
                <MaterialIcon icon={'chevron_right'} size={'tiny'}/>
            </div>
        </div>
    );
};


const Pagination = withRouter((enhance(PaginationPure)));


export default Pagination;


const Ellipses = () => <div className='Pagination__ellipses'>...</div>;

export const PaginationNumberLink = ({ number, activePageNumber, onPaginationPageClicked }) => {
    return <div onClick={onPaginationPageClicked(number)}
                className={classNames('Pagination__number-link', { 'active': number === activePageNumber })}>{number}</div>;
};
