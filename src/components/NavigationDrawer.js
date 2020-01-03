import React from 'react';
import { observer } from 'mobx-react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Link } from "react-router-dom";
import {
    Drawer,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import OrganizerIcon from '@material-ui/icons/Business';
import EventIcon from '@material-ui/icons/Event';
import CategoryIcon from '@material-ui/icons/List';

const useStyles = makeStyles(theme => ({
    drawer: props => ({
        width: props.width,
        flexShrink: 0,
        whiteSpace: 'nowrap',
      }),
    drawerOpen: props => ({
        width: props.width,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    drawerClose: props => ({
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    }),
    toolbar: {}
}));

function NavigationDrawer(props) {
    const { open, toggleNavigation } = props;
    const classes = useStyles(props);
    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
            }}
        >
            <div className={classes.toolbar}>
                <IconButton onClick={toggleNavigation}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
                <ListItem to="/events" component={Link} button>
                    <ListItemIcon><EventIcon /></ListItemIcon>
                    <ListItemText primary={'Events'} />
                </ListItem>
                <ListItem to="/organizers" component={Link} button>
                    <ListItemIcon><OrganizerIcon /></ListItemIcon>
                    <ListItemText primary={'Organizers'} />
                </ListItem>
                <ListItem to="/categories" component={Link} button>
                    <ListItemIcon><CategoryIcon /></ListItemIcon>
                    <ListItemText primary={'Categories'} />
                </ListItem>
            </List>
        </Drawer>
    )
}

export default observer(NavigationDrawer);