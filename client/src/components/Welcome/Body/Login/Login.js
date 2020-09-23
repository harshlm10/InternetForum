import React, { useState } from 'react'
import { useFormik } from 'formik'
import { Redirect } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '62vh'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = () => {
    const [route, setRoute] = useState(false)
    const initialValues = {
        loginemail: '',
        loginpassword: ''
    }
    const validate = (values) => {
        const errors = {}
        if (!values.loginemail)
            errors.loginemail = 'Required!'
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.loginemail))
            errors.loginemail = 'Invalid Email!'
        if (!values.loginpassword)
            errors.loginpassword = 'Required!'
        return errors
    }
    const formik = useFormik({
        initialValues,
        validate,
        onSubmit: values => {
            fetch('https://localhost:5000/login', {
                method: 'POST',
                mode: 'cors',
                credentials : 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if(data.succ)
                        setRoute(true)
                })
                .catch(err => console.log(err))
        }
    })
    const classes = useStyles();
    return (
        <div className={classes.paper}>
            {route && <Redirect to={{ pathname: "/home" }} />}
            <CssBaseline />
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Login
                </Typography>
            <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="loginemail"
                    label="Email Address"
                    name="loginemail"
                    autoFocus
                    {...formik.getFieldProps('loginemail')}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="loginpassword"
                    label="Password"
                    type="password"
                    id="loginpassword"
                    {...formik.getFieldProps('loginpassword')}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign In
                        </Button>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                      </Link>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default Login 