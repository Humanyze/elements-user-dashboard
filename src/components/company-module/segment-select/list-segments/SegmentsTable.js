import React from 'react';
import PropTypes from 'prop-types';
import { elementsReact, elementsRedux } from 'ElementsWebCommon';

import {
  useTable,
  useSortBy,
  useBlockLayout,
  useResizeColumns
} from 'react-table';
import {
  DefaultColumnFilter,
  sortingIndicator
} from 'Src/components/table-utils';
import { FixedSizeList } from 'react-window';

import './segments-table.scss';

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

  const tableObject = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout,
    useResizeColumns,
    useSortBy
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

  // Earlier versions did not set totalColumnsWidth, so be preparied to calculate it if needed
  const totalColumnWidth = tableObject.totalColumnsWidth || tableObject.allColumns.reduce(
    (accum, column) => {
      return accum + column.width;
    },0);

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
          >
            {RenderRow}
          </FixedSizeList>
        </div>
      </div>
    </React.Fragment>

  );
}

function SegmentsTable(props) {

  const {
    showLoading,
    segments,
    translations,
  } = props;

  const columns = React.useMemo(
    () => [
      {
        id: 'name',
        Header: 'Name',
        accessor: 'name',
        width: 350,
        minWidth: 150,
        maxWidth: 450,
      },
      {
        id: 'start_date',
        Header: 'Start Date',
        accessor: 'start_date',
        className: 'start_date',
      },
      {
        id: 'end_date',
        Header: 'End Date',
        accessor: 'end_date',
        className: 'end_date',
      },
      {
        id: 'participant_count',
        Header: 'Count',
        accessor: 'partcipant_count',
        className: 'participant_count',
        width: 100,
      },
      {
        id: 'status',
        Header: translations['Segments_Table__header-status'],
        accessor: 'status',
        className: 'status',
        width: 100,
      },
      {
        id: 'actions',
        Header: translations['Segments_Table__header-actions'],
        accessor: 'end_date',
        Cell: ({ row, }) => {
          return (
            <div className={'actions'}>
              <a href='edit/' className='action'>Edit</a>
              <a href='delete/' className='action'>Delete</a>
            </div>
          );
        },
      },
    ], [ translations, ]);

  if (showLoading) {
    return <LoadingUI/>;
  }

  return (
    <div className='SegmentsTable'>
      <div className='SegmentsTable__table-padding'>
        <div className='SegmentsTable__table-wrapper'>
          <Table
            className='SegmentsTable__table'
            columns={columns}
            data={segments || []}
          />
        </div>
      </div>
    </div>
  );
}

SegmentsTable.propTypes = {
  translations: translationPropTypeShape.isRequired,
  showLoading: PropTypes.bool.isRequired,
  segments: PropTypes.arrayOf(PropTypes.object), // NOT required
};

export default SegmentsTable;
