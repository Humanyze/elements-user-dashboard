import React from 'react';
import PropTypes from 'prop-types';
import matchSorter from 'match-sorter';

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter, },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id, },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [ ...options.values() , ];
  }, [
    id,
    preFilteredRows
    ,
  ]);

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value=''>All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
function NumberRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id, },
}) {
  const [
    min,
    max
    ,
  ] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [
      min,
      max
      ,
    ];
  }, [
    id,
    preFilteredRows
    ,
  ]);

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <input
        value={filterValue[0] || ''}
        type='number'
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            val ? parseInt(val, 10) : undefined,
            old[1],
          ]);
        }}
        placeholder={`Min (${min})`}
        style={{
          width: '70px',
          marginRight: '0.5rem',
        }}
      />
      to
      <input
        value={filterValue[1] || ''}
        type='number'
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            old[0],
            val ? parseInt(val, 10) : undefined,
          ]);
        }}
        placeholder={`Max (${max})`}
        style={{
          width: '70px',
          marginLeft: '0.5rem',
        }}
      />
    </div>
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [ (row) => row.values[id] , ], });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [
      resolvedRef,
      indeterminate,
    ]);

    return (
      <>
        <input type='checkbox' ref={resolvedRef} {...rest} />
      </>
    );
  }
);

const TableCount = (props) => {
  return (
    <div className={props.className}>
      <span className='value'>{props.value}</span> {props.legend}
    </div>);
};
TableCount.propTypes = {
  className: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  legend: PropTypes.string.isRequired,
};

const sortingIndicator = (column) => {
  if (column.disableSortBy) {
    return null;
  }
  let className = 'sort-indicator';
  if (column.isSorted) {
    className += ' ascending';
  } else if (column.isSortedDesc) {
    className += ' descending';
  } else {
    className += ' sortable';
  }
  return (<div className='fas sort-button' data-test={`sort-${column.id}`} {...column.getSortByToggleProps()}>
    <span className={className} />
  </div>);
};


export {
  DefaultColumnFilter,
  IndeterminateCheckbox,
  NumberRangeColumnFilter,
  SelectColumnFilter,
  TableCount,
  sortingIndicator
};
