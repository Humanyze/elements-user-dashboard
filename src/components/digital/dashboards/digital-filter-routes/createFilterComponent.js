import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import FilterComposeHOF from 'Src/components/common/metric-filter-block/FilterComposeHOF';
import DropdownSelector from 'Src/components/common/dropdown-selector/DropdownSelector';

export const createFilterComponent = (config) => compose(withRouter, FilterComposeHOF(config))(DropdownSelector);