import React from 'react';
import { storiesOf } from '@storybook/react';
// import { RouterContext, StoreContext } from 'TestUtils/contextCreators';
import { PaginationPure } from './Pagination';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';

const stories = storiesOf('Pagination', module);

stories.addDecorator(withKnobs);

const defaultProps = {
    activePageNumber: undefined,
    numberOfPages: undefined,
    goToPage: () => {}
};

const onePage = {
    activePageNumber: 1,
    numberOfPages: 1
};

const twoPages = {
    activePageNumber: 1,
    numberOfPages: 2
};

const threePages = {
    activePageNumber: 1,
    numberOfPages: 3,
};

const sixPages = {
    activePageNumber: 1,
    numberOfPages: 6
};

const twelvePages = {
    activePageNumber: 1,
    numberOfPages: 12
};


const createComp = (props) => <PaginationPure {...defaultProps} {...props}/>;

stories
    .add('initial', () => <PaginationPure goToPage={() => {}} activePageNumber={number('activePageNumber', 1)} numberOfPages={number('numberOfPages', 1)}/>);

storiesOf('Pagination/onePage', module)
    .add('onePage', () => createComp(onePage));

storiesOf('Pagination/twoPages', module)
    .add('pageOneSelected', () => createComp(twoPages))
    .add('pageTwoSelected', () => createComp({ ...twoPages, activePageNumber: 2 }));


storiesOf('Pagination/threePages', module)
    .add('pageOneSelected', () => createComp(threePages))
    .add('pageTwoSelected', () => createComp({ ...threePages, activePageNumber: 2 }))
    .add('pageThreeSelected', () => createComp({ ...threePages, activePageNumber: 3 }));


// for one sided ellipses/transition case
storiesOf('Pagination/sixPages', module)
    .add('pageOneSelected', () => createComp(sixPages))
    .add('pageTwoSelected', () => createComp({ ...sixPages, activePageNumber: 2 }))
    .add('pageThreeSelected', () => createComp({ ...sixPages, activePageNumber: 3 }))
    .add('pageFourSelected', () => createComp({ ...sixPages, activePageNumber: 4 }))
    .add('pagefiveSelected', () => createComp({ ...sixPages, activePageNumber: 5 }))
    .add('pageSixSelected', () => createComp({ ...sixPages, activePageNumber: 6 }));

storiesOf('Pagination/twelvePages', module)
    .add('pageOneSelected', () => createComp(twelvePages))
    .add('pageSevenSelected', () => createComp({...twelvePages, activePageNumber: 7}))
    .add('page11Selected', () => createComp({...twelvePages, activePageNumber: 11}));
