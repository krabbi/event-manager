import React from "react";
import { inject, observer } from "mobx-react";
import { withStyles} from '@material-ui/styles';
import {
    TableRow,
    TableCell,
    Typography,
} from '@material-ui/core';
import Table from '../../components/Table';


const organizerHeaders = [
    {
      id: 'name',
      label: 'Name',
    },
];

function CategoryRow({ row }) {
    return (
      <TableRow key={row.id} >
        <TableCell>
            <Typography>
                {row.name}
            </Typography>
        </TableCell>
      </TableRow>
    );
};

const styles = theme => ({
    root: {},
});

@withStyles(styles)
@inject(stores => ({
    categoryStore: stores.rootStore.categoryStore,
}))
@observer
export default class CategoriesTable extends React.Component {
    render() {
        const { classes, categoryStore } = this.props;
        const { categories, count, categoriesPerPage, page, changeCategoriesPerPage, 
            changePage} = categoryStore;

        return (
            <div className={classes.root}>
                <Table 
                    columnHeaders={organizerHeaders}
                    totalItems={count}
                    rowsPerPage={categoriesPerPage} 
                    page={page}
                    onChangePage={changePage.bind(categoryStore)}
                    onChangeRowsPerPage={changeCategoriesPerPage.bind(categoryStore)}
                    data={categories}
                    RowComponent={CategoryRow}
                    title='Categories'
                />
            </div>
        );
    }
}