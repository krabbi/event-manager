import React, {useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    CardActions,
    Button,
    TextField,
} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        width: 400,
    },
    content: {
        display: 'flex',
        flexDirection: 'column'
    }
});

function LoginForm(props) {
  const classes = useStyles();
  const passwordInput = useRef();
  const loginInput = useRef();
  const { onSubmit } = props;

  return (
    <Card className={classes.root}>
        <CardContent className={classes.content}>
            <TextField 
                label="Email" 
                defaultValue="" 
                inputRef={loginInput}
            />
            <br/>
            <TextField
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                inputRef={passwordInput}
            />
        </CardContent>
        <CardActions>
            <Button onClick={() => {
                const email = loginInput.current.value;
                const password = passwordInput.current.value;
                if (!email || !password) {
                    alert('Email and password are required'); //didn't have time to implement validation :/
                    return;
                }
                onSubmit(email, password)
            }}>Confirm</Button>
        </CardActions>
    </Card>
  );
}

export default LoginForm;