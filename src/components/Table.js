import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableContainer,
    TableHead,
    TablePagination,
    Paper,
    Typography,
    Toolbar,
    TextField,
} from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
  }
});

function CustomTable(props) {
  const classes = useStyles();
  const { columnHeaders, totalItems, rowsPerPage, page, onChangePage,
    onChangeRowsPerPage, data, RowComponent, title, searchString, handleChangeSearch, 
    searchEnabled } = props;

  return (
    <TableContainer component={Paper}>
        <Toolbar className={classes.toolbar}>
            <Typography variant="h6" >
                {title}
            </Typography>
            {searchEnabled && (
                <TextField label="Search" 
                    value={searchString} 
                    onChange={event => handleChangeSearch(event.target.value)}
                />
            )}
        </Toolbar>
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    {columnHeaders.map(column => (
                        <TableCell
                            key={column.id}
                        >
                            <Typography>
                                {column.label}
                            </Typography>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map(row => <RowComponent row={row} {...props} key={row.id}/>)}
            </TableBody>
        </Table>
        {totalItems !== undefined && rowsPerPage !== undefined && totalItems !== undefined && 
            onChangePage && (
                <TablePagination
                    rowsPerPageOptions={[15, 30, 50]}
                    count={totalItems}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    component='div'
                    onChangePage={(event, newPage) => onChangePage(newPage)}
                    onChangeRowsPerPage={(event) => {
                        onChangeRowsPerPage(parseInt(event.target.value, 10));
                        onChangePage(0)
                    }}
                />
            )
        }
    </TableContainer>
  );
}

export default CustomTable;