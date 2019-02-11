import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { elementsReact } from 'ElementsWebCommon';

const {
  FilterComposeHOF,
  DropdownSelector,
} = elementsReact;

export const createFilterComponent = (config) => compose(withRouter, FilterComposeHOF(config))(DropdownSelector);
