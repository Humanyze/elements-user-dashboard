import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RouterPaths from 'Src/routerPaths';
import { METRIC_FILTER_KEYS } from 'Src/redux/common/filter-ui/filterUIReducer';
import FilterComposeHOF from 'Src/components/common/metric-filter-block/FilterComposeHOF';
import DropdownSelector from 'Src/components/common/dropdown-selector/DropdownSelector';
import { compose } from 'recompose';


const createFilterComponent = (config) => compose(FilterComposeHOF(config))(DropdownSelector);

const filterConfigs = {
  adjacenciesComparison: {
    labelKey       : 'AdjacenciesComparisonFilter__label',
    translationKeys: [
      'AdjacenciesComparisonFilter__all',
      'AdjacenciesComparisonFilter__selected'
    ],
    filterKey      : METRIC_FILTER_KEYS.ADJACENCIES_COMPARISON,
  },
};

debugger;

const AdjacenciesComparisonFilter = createFilterComponent(filterConfigs.adjacenciesComparison);

const FilterRoutes = () => {
  return (
    <Switch>
      {/* <Route component={() => null}/> */}
      <Route path={RouterPaths.collaboration__adjacencies} component={AdjacenciesComparisonFilter}/>
      {/* NOTE: add other filters here */}
    </Switch>
  );
};

export default FilterRoutes;
