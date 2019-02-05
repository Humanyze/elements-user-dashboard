import React from 'react';
import pluralize from 'pluralize';
import { connect } from 'react-redux';
import { compose, withProps, withHandlers, pure } from 'recompose';
import { withRouter } from 'react-router-dom';
import './adjacencies-receiver-filter.scss';
import { elementsReact, elementsRedux } from 'elements-web-common';

const { DropdownSelector, filterOnChangeCreator, filterLifecycleCreator } = elementsReact;
console.warn(elementsReact);

const {
  languageSelectors: { getCurrentTranslations },
  METRIC_FILTER_KEYS,
  filterUISelectors: { getMetricFilterValue },
  filterUIActions: { setMetricFilterByKey },
  groupUISelectors: { getGroupableFields },
} = elementsRedux;

const enhanceCreator = (filterKey = METRIC_FILTER_KEYS.ADJACENCIES_RECEIVER) =>
  compose(
    withRouter,
    connect(
      (state) => ({
        translations: getCurrentTranslations(state),
        groupableFields: getGroupableFields(state),
        value: getMetricFilterValue(filterKey)(state),
      }),
      (dispatch) => ({
        setFilterValue: (value) =>
          dispatch(
            setMetricFilterByKey({
              filterKey: filterKey,
              value,
            })
          ),
      })
    ),
    withProps(({ groupableFields, translations }) => ({
      options: groupableFields.map((group) => ({ ...group, text: group.name })),
      label: translations['AdjacenciesReceiverFilter__label'],
      tooltipText: translations['AdjacenciesReceiverFilter__tooltip-text'],
    })),
    withHandlers({
      onChange: filterOnChangeCreator({ filterKey }),
    }),
    pure,
    filterLifecycleCreator({ filterKey })
  );

const AdjacenciesReceiverFilterPure = (props) => {
  const { options, value, onChange, label, tooltipText } = props;
  const DropdownProps = {
    options,
    value: value && pluralize(value),
    onChange,
    label,
    tooltipText,
    tooltipEnterDelay: 1,
    pluralizeOptionText: true,
  };

  return (
    <div className='AdjacenciesReceiverFilterWrapper'>
      <DropdownSelector {...DropdownProps} />
    </div>
  );
};

export default enhanceCreator()(AdjacenciesReceiverFilterPure);
