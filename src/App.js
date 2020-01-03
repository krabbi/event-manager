import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/styles';
import {
    CssBaseline,
} from '@material-ui/core';

import NavigationDrawer from './components/NavigationDrawer'
import ApplicationBar from './containers/ApplicationBar'
import EventsTable from './containers/events/EventsTable';
import Event from './containers/events/Event';
import Login from './containers/Login';
import Register from './containers/Register';
import OrganizersTable from './containers/organizers/OrganizersTable';
import CategoriesTable from './containers/categories/CategoriesTable';

const drawerWidth = 240;
const styles = theme => ({
    root: {
      display: 'flex',
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
});

@withStyles(styles)
@inject(stores => ({
    commonStore: stores.rootStore.commonStore,
}))
@withRouter
@observer
export default class App extends React.Component {

    render() {
        const { classes, commonStore } = this.props
        const { toggleNavigation, navigationOpen } = commonStore;return (
            <div className={classes.root}>
                <CssBaseline />
                <ApplicationBar 
                    drawerWidth={drawerWidth} 
                />
                <NavigationDrawer 
                    open={navigationOpen} 
                    width={drawerWidth} 
                    toggleNavigation={toggleNavigation.bind(commonStore)}
                    classes={{
                        toolbar: classes.toolbar,
                    }}
                />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Switch>
                        <Route path='/' component={EventsTable} exact/>
                        <Route path='/events' component={EventsTable} exact/>
                        <Route path='/events/:eventId' component={Event} exact/>
                        <Route path='/login' component={Login} exact/>
                        <Route path='/register' component={Register} exact/>
                        <Route path='/organizers' component={OrganizersTable} exact/>
                        <Route path='/categories' component={CategoriesTable} exact/>
                    </Switch>
                </main>
            </div>
        );
    }
}