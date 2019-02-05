import { elementsRedux } from 'ElementstWebCommon';
const {
  METRIC_FILTER_KEYS
} = elementsRedux;

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
    labelKey: 'StreamFilter__label',
    translationKeys: [
      'StreamFilter__all',
      'StreamFilter__meeting',
      'StreamFilter__email',
      'StreamFilter__chat',
      'StreamFilter__call'
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
  communicationDistributionStream: {
    labelKey: 'StreamFilter__label',
    translationKeys: [
      'StreamFilter__all',
      'StreamFilter__meeting',
      'StreamFilter__email',
      'StreamFilter__chat',
      'StreamFilter__call'
    ],
    filterKey: METRIC_FILTER_KEYS.COMMUNICATION_DISTRIBUTION_STREAM,
  },
  communicationDistributionLevel: {
    labelKey: 'CommunicationDistributionLevelFilter__label',
    translationKeys: [
      'CommunicationDistributionLevelFilter__group',
      'CommunicationDistributionLevelFilter__participant',
    ],
    filterKey: METRIC_FILTER_KEYS.COMMUNICATION_DISTRIBUTION_LEVEL,
  },
  digitalDriversHours: {
    labelKey: 'DigitalDriversHoursFilter__label',
    translationKeys: [
      'DigitalDriversHoursFilter__work',
      'DigitalDriversHoursFilter__afterWork',
      'DigitalDriversHoursFilter__allDay',

    ],
    filterKey: METRIC_FILTER_KEYS.DIGITAL_DRIVERS_HOURS
  },
  digitalDriversUnit: {
    labelKey: 'DigitalDriversUnitFilter__label',
    translationKeys: [
      'DigitalDriversUnitFilter__minutes',
      'DigitalDriversUnitFilter__percentages',

    ],
    filterKey: METRIC_FILTER_KEYS.DIGITAL_DRIVERS_UNIT
  },
  digitalResponseTimeHours: {
    labelKey: 'DigitalResponseTimeHoursFilter__label',
    translationKeys: [
      'DigitalResponseTimeHoursFilter__work',
      'DigitalResponseTimeHoursFilter__afterWork',
      'DigitalResponseTimeHoursFilter__allDay',
    ],
    filterKey: METRIC_FILTER_KEYS.DIGITAL_RESPONSE_TIME_HOURS
  },
  digitalResponseTimePeople: {
    labelKey: 'DigitalResponseTimePeopleFilter__label',
    translationKeys: [
      'DigitalResponseTimePeopleFilter__all',
      'DigitalResponseTimePeopleFilter__manager',
      'DigitalResponseTimePeopleFilter__non-manager'
    ],
    filterKey: METRIC_FILTER_KEYS.DIGITAL_RESPONSE_TIME_PEOPLE
  },
  digitalAllocationHours: {
    labelKey: 'DigitalAllocationHoursFilter__label',
    translationKeys: [
      'DigitalAllocationHoursFilter__work',
      'DigitalAllocationHoursFilter__afterWork',
      'DigitalAllocationHoursFilter__allDay'
    ],
    filterKey: METRIC_FILTER_KEYS.DIGITAL_TIME_ALLOCATION_HOURS,
  },
  digitalAllocationUnit: {
    labelKey: 'DigitalAllocationUnitFilter__label',
    translationKeys: [
      'DigitalAllocationUnitFilter__minutes',
      'DigitalAllocationUnitFilter__percentages',
    ],
    filterKey: METRIC_FILTER_KEYS.DIGITAL_TIME_ALLOCATION_UNIT,
  },
};
