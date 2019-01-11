import { METRIC_FILTER_KEYS } from 'Src/redux/common/filter-ui/filterUIReducer';

export const filterConfigs = {
  adjacenciesComparison: {
    labelKey: 'AdjacenciesComparisonFilter__label',
    translationKeys: [
      'AdjacenciesComparisonFilter__all',
      'AdjacenciesComparisonFilter__selected'
    ],
    filterKey: METRIC_FILTER_KEYS.ADJACENCIES_COMPARISON,
  },
  adjacenciesStream: {
    labelKey: 'AdjacenciesStreamFilter__label',
    translationKeys: [
      'AdjacenciesStreamFilter__all',
      'AdjacenciesStreamFilter__meeting',
      'AdjacenciesStreamFilter__email',
      'AdjacenciesStreamFilter__chat',
      'AdjacenciesStreamFilter__call'
    ],
    filterKey: METRIC_FILTER_KEYS.ADJACENCIES_STREAM,
  },
  adjacenciesUnit: {
    labelKey: 'AdjacenciesUnitFilter__label',
    translationKeys: [
      'AdjacenciesUnitFilter__hours',
      'AdjacenciesUnitFilter__percentages'
    ],
    filterKey: METRIC_FILTER_KEYS.ADJACENCIES_UNIT,
  },
  digitalAllocationHours: {
    labelKey: 'DigitalAllocationHoursFilter__label',
    translationKeys: [
      'DigitalAllocationHoursFilter__work',
      'DigitalAllocationHoursFilter__afterWork',
      'DigitalAllocationHoursFilter__allDay'
    ],
    filterKey: METRIC_FILTER_KEYS.DIGITAL_TIME_ALLOCATION_HOURS,
  }
};
