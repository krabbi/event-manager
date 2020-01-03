import React from "react";
import { inject, observer } from "mobx-react";
import { withStyles} from '@material-ui/styles';
import Table from '../../components/Table';
import OrganizerRow from '../../components/organizers/OrganizerRow'


const organizerHeaders = [
    {
      id: 'name',
      label: 'Name',
    },
];

const styles = theme => ({
    root: {},
});

@withStyles(styles)
@inject(stores => ({
  organizerStore: stores.rootStore.organizerStore,
}))
@observer
export default class OrganizersTable extends React.Component {
    render() {
        const { classes, organizerStore } = this.props;
        const { organizers, count, organizersPerPage, page, changeOrganizersPerPage, changePage} = organizerStore;

        return (
            <div className={ classes.root}>
                <Table 
                    columnHeaders={organizerHeaders}
                    totalItems={count}
                    rowsPerPage={organizersPerPage} 
                    page={page}
                    onChangePage={changePage.bind(organizerStore)}
                    onChangeRowsPerPage={changeOrganizersPerPage.bind(organizerStore)}
                    data={organizers}
                    RowComponent={OrganizerRow}
                    title='Organizers'
                />
            </div>
        );
    }
}