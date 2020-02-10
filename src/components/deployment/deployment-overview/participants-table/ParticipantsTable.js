import React from 'react';
import PropTypes from 'prop-types';
import './participants-table.scss';
import {
  useTable,
  useFilters,
  useRowSelect,
  useSortBy,
  useBlockLayout,
  useResizeColumns
} from 'react-table';
import { FixedSizeList } from 'react-window';
import matchSorter from 'match-sorter';

import { withRouter } from 'react-router-dom';
import { elementsReact, elementsRedux } from 'ElementsWebCommon';

const {
  LoadingUI,
} = elementsReact;
const {
  translationPropTypeShape,
} = elementsRedux;


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

// Our actual table component
function Table(props) {
  // Use the state and functions returned from useTable to build your UI
  const { columns, data, } = props;

  const defaultColumn = React.useMemo(
    () => ({
      width: 150,
      minWidth: 50,
      maxWidth: 150,
      canResize: true,
      filter: DefaultColumnFilter,
      className: 'td',
    }),
    []
  );

  const tableObject = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout,
    useResizeColumns,
    useFilters,
    useSortBy,
    useRowSelect
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    totalColumnsWidth,
    prepareRow,
  } = tableObject;

  const RenderRow = React.useCallback(
    ({ index, style, }) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <div
          {...row.getRowProps({
            style,
          })}
          className='tr'
        >
          {row.cells.map((cell) => {
            const cellProps = cell.getCellProps({
              className: `td ${cell.column.id || ''}`,
            });
            return (
              <div {...cellProps}>
                { cell.render('Cell') }
              </div>
            );
          })}
        </div>
      );
    },
    [
      prepareRow,
      rows,
    ]
  );

  const totalColumnWidth = tableObject.flatColumns.reduce(
    (accum, column) => {
      return accum + column.width;
    }
  );

  const bodyProps = getTableBodyProps();

  // Render the UI for your table
  return (
    <div {...getTableProps()} className={props.className}>
      <div>
        {headerGroups.map((headerGroup) => (
          <div {...headerGroup.getHeaderGroupProps()} width='100%' className='tr'>
            {headerGroup.headers.map((column) => (
              <div {...column.getHeaderProps(column.getSortByToggleProps())} width={column.width} className='th'>
                {column.render('Header')}
                {/* Add a sort direction indicator */}
                <span className='sort-indicator'>
                  {column.isSorted
                    ? column.isSortedDesc
                      ? ' 🔽'
                      : ' 🔼'
                    : ''}
                </span>
                {/* Render the columns filter UI */}
                <div
                  {...column.getResizerProps()}
                  className={`resizer ${column.isResizing ? 'isResizing' : ''}`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div {...bodyProps}>
        <FixedSizeList
          width={totalColumnWidth}
          height={400}
          itemCount={rows.length}
          itemSize={35}
          selectedItems={tableObject.selectedFlatRows.length}
        >
          {RenderRow}
        </FixedSizeList>
      </div>
    </div>
  );
}

function ParticipantsTable(props) {

  const columns = React.useMemo(
    () => [
      {
        id: 'selection',
        // The header can use the table's getToggleAllRowsSelectedProps method
        // to render a checkbox
        Header: ({ getToggleAllRowsSelectedProps, }) => {
          const props = getToggleAllRowsSelectedProps();
          return (
            <div>
              <IndeterminateCheckbox {...props} />
            </div>
          );
        },
        // The cell can use the individual row's getToggleRowSelectedProps method
        // to the render a checkbox
        Cell: ({ row, }) => {
          const rowProps = row.getToggleRowSelectedProps();
          console.log(rowProps.checked, rowProps.indeterminate);
          return (
            <div className={'selection'}>
              <IndeterminateCheckbox {...rowProps} />
            </div>
          );
        },
        canResize: false,
        disableSortBy: true,
        width: 50,
      },
      {
        id: 'email',
        Header: 'email',
        accessor: 'email',
        width: 350,
        minWidth: 150,
        maxWidth: 450,
      },
      {
        id: 'alias',
        Header: 'Alias',
        accessor: 'alias',
        // Use our custom `fuzzyText` filter on this column
        filter: 'fuzzyText',
      },
      {
        id: 'gender',
        Header: 'Gender',
        accessor: 'gender',
        Filter: SelectColumnFilter,
        filter: 'equals',
        className: 'gender',
        width: 80,
      },
      {
        id: 'isManager',
        Header: 'Manager?',
        accessor: 'manager',
        Filter: SelectColumnFilter,
        filter: 'equals',
        width: 80,
      },
      {
        id: 'teamsManaged',
        Header: 'Teams Managed',
        accessor: 'teams_managed',
        Filter: NumberRangeColumnFilter,
        filter: 'between',
        width: 80,
      },
      {
        id: 'timezone',
        Header: 'Timezone',
        accessor: 'timezone',
        Filter: SelectColumnFilter,
        filter: 'equals',
        width: 100,
      },
      {
        id: 'working_hours_start',
        Header: 'Start Work',
        accessor: 'working_hours_start',
        Filter: NumberRangeColumnFilter,
        filter: 'between',
        width: 120,
      },
      {
        id: 'working_hours_end',
        Header: 'End Work',
        accessor: 'working_hours_end',
        Filter: NumberRangeColumnFilter,
        filter: 'between',
        width: 120,
      },
      {
        id: 'active_badge',
        Header: 'Badge?',
        accessor: 'active_badge',
        Filter: SelectColumnFilter,
        filter: 'equals',
        width: 80,
      },
      {
        id: 'active_digital',
        Header: 'Digital?',
        accessor: 'active_digital',
        Filter: SelectColumnFilter,
        filter: 'equals',
        width: 80,
      },
    ], []);

  const {
    showLoading,
    participants,
    translations,
  } = props;

  const TableOrLoading = () => {
    if (showLoading) {
      return <LoadingUI/>;
    }
    return (
      <Table
        className='ParticipantsTable__table'
        columns={columns}
        data={participants || []}/>
    );
  };

  return (
    <div className='ParticipantsTable'>
      <div className='ParticipantsTable__table-padding'>
        <div className='ParticipantsTable__table-wrapper'>
          <TableOrLoading/>
        </div>
      </div>
    </div>
  );
}

ParticipantsTable.propTypes = {
  translations: translationPropTypeShape.isRequired,
  showLoading: PropTypes.bool.isRequired,
  participants: PropTypes.arrayOf(PropTypes.object), // NOT required
};

export default withRouter(ParticipantsTable);
