import React, { Fragment } from 'react';
import { compose, withProps } from 'recompose';
import { createFilterComponent } from 'Src/components/digital/dashboards/digital-filter-routes/createFilterComponent';
import { filterConfigs } from 'Src/components/digital/dashboards/digital-filter-routes/filterConfigs';
import AdjacenciesReceiverFilter from './AdjacenciesReceiverFilter';
import BackToEmberLink from 'Src/components/common/back-to-ember-link/BackToEmberLink';
import { connect } from 'react-redux';
import {
  getMetricFilterValue, METRIC_FILTER_KEYS
} from 'Redux/common/filter-ui/filterUIReducer';
import { getActiveGroupableField } from 'Redux/common/group-ui/groupUIReducer';

const AdjacenciesComparisonFilter = createFilterComponent(
  filterConfigs.adjacenciesComparison
);
const AdjacenciesStreamFilter = createFilterComponent(
  filterConfigs.adjacenciesStream
);
const AdjacenciesUnitFilter = createFilterComponent(
  filterConfigs.adjacenciesUnit
);

const enhance = compose(
  connect(state => ({
    receiverFilterValue: getMetricFilterValue(METRIC_FILTER_KEYS.ADJACENCIES_RECEIVER)(state),
    activeGroupableField: getActiveGroupableField(state)
  })),
  withProps(({ receiverFilterValue, activeGroupableField }) => {
    const disableComparisonFilter = activeGroupableField ? (receiverFilterValue !== activeGroupableField.name) : false;

    return {
      disableComparisonFilter
    };
  })
);

export const AdjacenciesFiltersPure = ({
  disableComparisonFilter,
  disabledComparisonTooltipText
}) => (
    <Fragment>
      <AdjacenciesReceiverFilter />
      <AdjacenciesComparisonFilter
        disabled={disableComparisonFilter}
        disabledTooltipText={disabledComparisonTooltipText}
      />
      <AdjacenciesStreamFilter />
      <AdjacenciesUnitFilter />
      <BackToEmberLink />
    </Fragment>
  );

export default enhance(AdjacenciesFiltersPure);
