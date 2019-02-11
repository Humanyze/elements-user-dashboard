import React, { Fragment } from 'react';
import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';
import AdjacenciesReceiverFilter from './AdjacenciesReceiverFilter';
import { createFilterComponent } from 'Src/components/digital/dashboards/digital-filter-routes/createFilterComponent';
import { filterConfigs } from 'Src/components/digital/dashboards/digital-filter-routes/filterConfigs';
import { elementsReact, elementsRedux } from 'ElementsWebCommon';

const {
  BackToEmberLink
} = elementsReact;

const {
  filterUISelectors: {
    getMetricFilterValue
  },
  METRIC_FILTER_KEYS,
  groupUISelectors: {
    getActiveGroupableField
  },
} = elementsRedux;
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
      <BackToEmberLink createLinkUrl={({ datasetId }) =>  `/digital/dcoll_top/dcoll_team_adjacencies?dataset=${datasetId}`} />
    </Fragment>
  );

export default enhance(AdjacenciesFiltersPure);
