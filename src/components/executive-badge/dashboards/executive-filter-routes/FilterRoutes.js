import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { compose } from 'recompose';
import { elementsReact, elementsRedux, routerPaths as RouterPaths } from 'ElementsWebCommon';

const {
  METRIC_FILTER_KEYS,
} = elementsRedux;

const {
  DropdownSelector,
  FilterComposeHOF,
  MultiButtonSelector,
} = elementsReact;

const WithBottomBorder = (Comp) => (props) => {
  return (
    <div className='MetricFilterBlock__bottom-border'>
      <Comp {...props} />
    </div>
  );
};

const createFilterComponentCreator = (Comp) => (config) => compose(
  WithBottomBorder,
  FilterComposeHOF(config)
)(Comp);

const createFilterDropdownComponent = createFilterComponentCreator(DropdownSelector);
const createFilterButtonComponent = createFilterComponentCreator(MultiButtonSelector);

const filterConfigs = {
  allocationVisualization: {
    labelKey: 'AllocationVisualizationFilter__label',
    translationKeys: [
      'AllocationVisualizationFilter__activity',
      'AllocationVisualizationFilter__space',
    ],
    filterKey: METRIC_FILTER_KEYS.SPACE_VISUALIZATION,
  },
};

const AllocationVisualizationFilter = createFilterButtonComponent(filterConfigs.allocationVisualization);

const FilterRoutes = () => {
  return (
    <Switch>
      <Route path={RouterPaths.collaboration__allocation} component={AllocationVisualizationFilter}/>
      {/* NOTE: add other filters here */}
    </Switch>
  );
};

export default FilterRoutes;
