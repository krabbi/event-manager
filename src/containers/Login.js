import React from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from 'react-router-dom';
import { withStyles} from '@material-ui/styles';
import LoginForm from '../components/LoginForm'

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
    },
});

@withStyles(styles)
@inject(stores => ({
    commonStore: stores.rootStore.commonStore,
    email: stores.rootStore.commonStore.email,
}))
@observer
@withRouter
export default class Login extends React.Component {
    componentDidMount() {
        if (this.props.email) {
            this.props.history.push('/')
        }
    }

    componentDidUpdate() {
        if (this.props.email) {
            this.props.history.push('/')
        }
    }

    render() {
        const { classes, commonStore } = this.props;
        return (
            <div className={classes.root}>
                <LoginForm onSubmit={(email, password) => {
                    commonStore.login(email, password)}
                }/>
            </div>
        );
    }
}