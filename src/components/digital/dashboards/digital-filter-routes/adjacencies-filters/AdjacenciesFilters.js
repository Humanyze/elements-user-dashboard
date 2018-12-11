import React, { Fragment } from 'react';
import { compose, withProps } from 'recompose';
import { createFilterComponent } from 'Src/components/digital/dashboards/digital-filter-routes/createFilterComponent';
import { filterConfigs } from 'Src/components/digital/dashboards/digital-filter-routes/filterConfigs';
import AdjacenciesReceiverFilter from './AdjacenciesReceiverFilter';
import { connect } from 'react-redux';
import { getMetricFilterValue, METRIC_FILTER_KEYS } from 'Redux/common/filter-ui/filterUIReducer';
import { getActiveGroupableField } from 'Redux/common/group-ui/groupUIReducer';
import { getCurrentTranslations } from 'Redux/common/language/languageReducer';

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
    translations: getCurrentTranslations(state),
    receiverFilterValue: getMetricFilterValue(
      METRIC_FILTER_KEYS.ADJACENCIES_RECEIVER
    )(state),
    activeGroupableField: getActiveGroupableField(state)
  })),
  withProps(({ receiverFilterValue, activeGroupableField, translations }) => {
    const disableComparisonFilter = activeGroupableField
      ? receiverFilterValue !== activeGroupableField.name
      : false;

    return {
      disabledComparisonTooltipText:
        translations['AdjacenciesComparisonFilter__disabled-tooltip'],
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
      disabledTooltip={disabledComparisonTooltipText}
    />
    <AdjacenciesStreamFilter />
    <AdjacenciesUnitFilter />
  </Fragment>
);

export default enhance(AdjacenciesFiltersPure);
