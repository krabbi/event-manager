import React from "react";
import { inject, observer } from "mobx-react";
import { withStyles} from '@material-ui/styles';
import Table from '../../components/Table';
import EventRow from '../../components/events/EventRow'


const eventHeaders = [
    {
      id: 'name',
      label: 'Name',
    }, {
      id: 'start',
      label: 'Starts at',
    }, {
      id: 'price',
      label: 'Price',
    }, {
      id: 'uri',
    },
];

const styles = theme => ({
    root: {},
});

@withStyles(styles)
@inject(stores => ({
    eventStore: stores.rootStore.eventStore,
}))
@observer
export default class EventsTable extends React.Component {
    render() {
        const { classes, eventStore } = this.props;
        const { events, eventsPerPage, page, searchString, changeEventsPerPage, changePage, 
          changeSearchString} = eventStore;

        return (
            <div className={ classes.root}>
                <Table 
                    columnHeaders={eventHeaders}
                    totalItems={eventStore.count}
                    rowsPerPage={eventsPerPage} 
                    page={page}
                    onChangePage={changePage.bind(eventStore)}
                    onChangeRowsPerPage={changeEventsPerPage.bind(eventStore)}
                    data={events}
                    RowComponent={EventRow}
                    title='Events'
                    searchEnabled={true}
                    searchString={searchString}
                    handleChangeSearch={changeSearchString.bind(eventStore)}
                />
            </div>
        );
    }
}