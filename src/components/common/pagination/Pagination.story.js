import React from 'react';
import { storiesOf } from '@storybook/react';
// import { RouterContext, StoreContext } from 'TestUtils/contextCreators';
import { PaginationPure } from './Pagination';


const defaultProps = {
    activePageNumber: undefined,
    numberOfPages: undefined
};

const onePage = {
    activePageNumber: 1,
    numberOfPages: 1
};

const simpleProps = {
    activePageNumber: 2,
    numberOfPages: 5
};


const largePagesEarlyProps= {
    activePageNumber: 3,
    numberOfPages: 50
};


const largePagesMiddleProps = {
    activePageNumber: 25,
    numberOfPages: 50
};
const largePagesEndProps = {
    activePageNumber: 47,
    numberOfPages: 50
};

const createComp = (props) => <PaginationPure {...defaultProps} {...props}/>;

storiesOf('Pagination', module)
    .add('initial', () => createComp())
    .add('onePage', () => createComp(onePage))
    .add('simple', () => createComp(simpleProps))
    .add('large # of Pages, early', () => createComp(largePagesEarlyProps))
    .add('large # of Pages, middle', () => createComp(largePagesMiddleProps))
    .add('large # of Pages, late', () => createComp(largePagesEndProps));
