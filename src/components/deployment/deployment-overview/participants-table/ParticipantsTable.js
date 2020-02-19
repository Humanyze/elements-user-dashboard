import React from 'react';
import PropTypes from 'prop-types';


import { FixedSizeList } from 'react-window';
import _size from 'lodash.size';
import { withRouter } from 'react-router-dom';
import { elementsReact, elementsRedux } from 'ElementsWebCommon';

import {
  actions,
  useTable,
  useFilters,
  useRowSelect,
  useSortBy,
  useBlockLayout,
  useResizeColumns
} from 'react-table';
import {
  DefaultColumnFilter,
  TableCount,
  IndeterminateCheckbox,
  SelectColumnFilter,
  NumberRangeColumnFilter,
  sortingIndicator
} from '../../../table-utils';

import './participants-table.scss';

const {
  LoadingUI,
} = elementsReact;
const {
  translationPropTypeShape,
} = elementsRedux;



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
      Filter: DefaultColumnFilter,
      className: 'td',
    }),
    []
  );

  // The useRowSelect that comes with react-table is broken.  This fixes it
  //   and needs to remain here until they fix the package itself.
  const useFixedRowSelect = (hooks) => {
    useRowSelect(hooks);
    hooks.stateReducers.pop();  // Remove the damaged reducer

    function reducer(state, action, previousState, instance) {
      if (action.type === actions.init) {
        return {
          selectedRowIds: {},
          ...state,
        };
      }

      if (action.type === actions.resetSelectedRows) {
        return {
          ...state,
          selectedRowIds: instance.initialState.selectedRowIds || {},
        };
      }

      if (action.type === actions.toggleAllRowsSelected) {
        const { selected, } = action;
        const { isAllRowsSelected, flatRowsById, } = instance;

        const selectAll = typeof selected !== 'undefined' ? selected : !isAllRowsSelected;

        // Only remove/add the rows that are visible on the screen
        //  Leave all the other rows that are selected alone.
        const selectedRowIds = Object.assign({}, state.selectedRowIds);

        if (selectAll) {
          Object.keys(flatRowsById).forEach((rowId) => {
            selectedRowIds[rowId] = true;
          });

        } else {
          Object.keys(flatRowsById).forEach((rowId) => {
            delete selectedRowIds[rowId];
          });
        }

        return {
          ...state,
          selectedRowIds,
        };
      }

      if (action.type === actions.toggleRowSelected) {
        const { id, selected, } = action;
        const { flatGroupedRowsById, } = instance;

        // Join the ids of deep rows
        // to make a key, then manage all of the keys
        // in a flat object
        const row = flatGroupedRowsById[id];
        const isSelected = row.isSelected;
        const shouldExist = typeof selected !== 'undefined' ? selected : !isSelected;

        if (isSelected === shouldExist) {
          return state;
        }

        const newSelectedRowIds = { ...state.selectedRowIds, };

        const handleRowById = (id) => {
          const row = flatGroupedRowsById[id];

          if (!row.isGrouped) {
            if (!isSelected && shouldExist) {
              newSelectedRowIds[id] = true;
            } else if (isSelected && !shouldExist) {
              delete newSelectedRowIds[id];
            }
          }

          if (row.subRows) {
            return row.subRows.forEach((row) => handleRowById(row.id));
          }
        };

        handleRowById(id);

        return {
          ...state,
          selectedRowIds: newSelectedRowIds,
        };
      }
    }
    hooks.stateReducers.push(reducer);
  };

  useFixedRowSelect.pluginName = useRowSelect.pluginName;

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
    useFixedRowSelect
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
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

  // Render the UI for your table
  return (
    <React.Fragment>
      <div {...getTableProps({ className: props.className , })} >
        <div>
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} width='100%' className='tr'>
              {headerGroup.headers.map((column) => (
                <div {...column.getHeaderProps()} width={column.width} className='th'>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  {sortingIndicator(column)}
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                  <div
                    {...column.getResizerProps()}
                    className={`resizer ${column.isResizing ? 'isResizing' : ''}`}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div {...getTableBodyProps()}>
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
      <div className='counts' >
        <TableCount className='selected' value={_size(tableObject.state.selectedRowIds)} legend='Selected' />
        <TableCount className='visible' value={tableObject.selectedFlatRows.length} legend='Selected and Visible' />
        <TableCount className='filtered' value={tableObject.filteredFlatRows.length} legend='Filtered' />
        <TableCount className='available' value={tableObject.data.length} legend='Available' />
      </div>
    </React.Fragment>

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
