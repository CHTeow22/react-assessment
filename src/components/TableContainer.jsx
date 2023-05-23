import React from 'react';
import { useTable, usePagination, useFilters } from 'react-table';
import { Table, Container, Button, Input, Row, Col } from 'reactstrap';

import { FilterInput } from './Filter.jsx';

const TableContainer = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    pageOptions,
    pageCount,
    page,
    state: { pageIndex, pageSize },
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
      defaultColumn: ({ Filter: FilterInput }),
    },
    useFilters,
    usePagination,
  )

  const onChangeInSelect = event => {
    setPageSize(Number(event.target.value))
  }
  
  const onChangeInInput = event => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0
    gotoPage(page)
  }

  return (
    <div>
      <Table bordered hover {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render("Header")}
                  <div>
                    {column.canFilter ? column.render('Filter') : null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </Table>

      <Container>
        <Row width="100%">
          <Col xs="2">
            <Button outline color="secondary" 
              onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {'<<'}
            </Button>{' '}
            <Button outline color="secondary" 
              onClick={previousPage} disabled={!canPreviousPage}>
              {'<'}
            </Button>
          </Col>
          
          <Col xs="2" lg="2">Page{' '} 
            <strong>{pageIndex + 1} of {pageOptions.length}</strong>{' '}
          </Col>
          
          <Col xs="3" lg="3" style={{display: 'inline-flex'}}>
            Go to page:{' '}
            <Input
              type="number"
              min={1}
              style={{width: '5em'}}
              max={pageOptions.length}
              defaultValue={pageIndex + 1}
              onChange={onChangeInInput}
            />
          </Col>

          <Col xs="3" lg="2">
            <select className='show-page'
              value={pageSize} 
              onChange={onChangeInSelect}
            >
              {[10, 20, 30, 40].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize} rows
                </option>
              ))}
            </select>
          </Col>

          <Col xs="2" style={{ textAlign: 'right' }}>
            <Button outline color="secondary"
              onClick={nextPage} disabled={!canNextPage}>
              {'>'}
            </Button>{' '}
            <Button outline color="secondary"
              onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
              {'>>'}
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default TableContainer;