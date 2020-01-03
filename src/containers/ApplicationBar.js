import React from 'react';
import { inject, observer } from "mobx-react";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
    AppBar,
    IconButton,
    Typography,
    Toolbar,
    Button
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: 36,
    },
        hide: {
        display: 'none',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: props => ({
        marginLeft: props.drawerWidth,
        width: `calc(100% - ${props.drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    toolbarItemWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    button: {
        color: theme.palette.common.white,
    }
}));

function ApplicationBar(props){
    const { commonStore } = props;
    const { navigationOpen, toggleNavigation, appName, email, logout } = commonStore;
    const classes = useStyles(props);
    return (
        <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
            [classes.appBarShift]: navigationOpen,
        })}
        >
            <Toolbar className={classes.toolbar}>
                <div className={classes.toolbarItemWrapper}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleNavigation.bind(commonStore)}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: navigationOpen,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {appName}
                    </Typography>
                </div>
                    {email ? (
                        <div className={classes.toolbarItemWrapper}>
                            <Typography>
                                {email}
                            </Typography>
                            <Button className={classes.button} onClick={logout.bind(commonStore)}>
                                Log Out
                            </Button>
                        </div>
                    ) : (
                        <div className={classes.toolbarItemWrapper}>
                            <Button className={classes.button} component={Link} to='/login'>
                                Sign In
                            </Button>
                            <Button className={classes.button} component={Link} to='/register'>
                                Sign Up
                            </Button>
                        </div>
                    )}

            </Toolbar>
        </AppBar>
    )
}

export default inject(stores => ({
    commonStore: stores.rootStore.commonStore,
}))(observer(ApplicationBar));