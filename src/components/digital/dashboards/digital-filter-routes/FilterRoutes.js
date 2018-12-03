import React, { Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import RouterPaths from 'Src/routerPaths';
import { METRIC_FILTER_KEYS } from 'Src/redux/common/filter-ui/filterUIReducer';
import FilterComposeHOF from 'Src/components/common/metric-filter-block/FilterComposeHOF';
import DropdownSelector from 'Src/components/common/dropdown-selector/DropdownSelector';
import { compose } from 'recompose';


const createFilterComponent = (config) => compose(withRouter, FilterComposeHOF(config))(DropdownSelector);

const filterConfigs = {
  adjacenciesComparison: {
    labelKey       : 'AdjacenciesComparisonFilter__label',
    translationKeys: [
      'AdjacenciesComparisonFilter__all',
      'AdjacenciesComparisonFilter__selected'
    ],
    filterKey      : METRIC_FILTER_KEYS.ADJACENCIES_COMPARISON,
  },
  adjacenciesStream: {
    labelKey       : 'AdjacenciesStreamFilter__label',
    translationKeys: [
      'AdjacenciesStreamFilter__all',
      'AdjacenciesStreamFilter__meeting',
      'AdjacenciesStreamFilter__email',
      'AdjacenciesStreamFilter__chat',
      'AdjacenciesStreamFilter__call'
    ],
    filterKey      : METRIC_FILTER_KEYS.ADJACENCIES_STREAM,
  },
  adjacenciesUnit: {
    labelKey       : 'AdjacenciesUnitFilter__label',
    translationKeys: [
      'AdjacenciesUnitFilter__hours',
      'AdjacenciesUnitFilter__percentages'
    ],
    filterKey      : METRIC_FILTER_KEYS.ADJACENCIES_UNIT,
  }
};

const AdjacenciesComparisonFilter = createFilterComponent(filterConfigs.adjacenciesComparison);
const AdjacenciesStreamFilter = createFilterComponent(filterConfigs.adjacenciesStream);
const AdjacenciesUnitFilter = createFilterComponent(filterConfigs.adjacenciesUnit);

const AdjacenciesFilters = () => (
  <Fragment>
    <AdjacenciesComparisonFilter />
    <AdjacenciesStreamFilter />
    <AdjacenciesUnitFilter />
  </Fragment>
);

const FilterRoutes = () => {
  return (
    <Switch>
      <Route path={RouterPaths.collaboration__adjacencies} component={AdjacenciesFilters}/>
      {/* NOTE: add other filters here */}
    </Switch>
  );
};

export default FilterRoutes;
