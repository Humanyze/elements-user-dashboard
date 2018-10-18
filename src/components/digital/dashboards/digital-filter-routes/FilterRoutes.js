import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RouterPaths from 'Src/routerPaths';
import { METRIC_FILTER_KEYS } from 'Src/redux/common/filter-ui/filterUIReducer';
import FilterComposeHOF from 'Src/components/common/metric-filter-block/FilterComposeHOF';
import DropdownSelector from 'Src/components/common/dropdown-selector/DropdownSelector';
import { compose } from 'recompose';


const createFilterComponent = (config) => compose(FilterComposeHOF(config))(DropdownSelector);

const filterConfigs = {
  allocationVisualization: {
    labelKey       : 'AllocationVisualizationFilter__label',
    translationKeys: [
      'AllocationVisualizationFilter__activity',
      'AllocationVisualizationFilter__space'
    ],
    filterKey      : METRIC_FILTER_KEYS.SPACE_VISUALIZATION,
  },
};

const AllocationVisualizationFilter = createFilterComponent(filterConfigs.allocationVisualization);

const FilterRoutes = () => {
  return (
    <Switch>
      {/*<Route path={RouterPaths.collaboration__allocation} component={AllocationVisualizationFilter}/>*/}
      {/* NOTE: add other filters here */}
    </Switch>
  );
};

export default FilterRoutes;