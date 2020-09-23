import React, { useState } from 'react'
import './Signup.css'
import { useFormik } from 'formik'
import { Redirect } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(8,4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height:'62vh'
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

const Signup = () => {
    const [route, setRoute] = useState(false)
    const initialValues = {
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    }
    
    const validate = values => {
        const errors = {}
        if (!values.firstname)
            errors.firstname = 'Required!'
        else if (values.firstname.length > 20)
            errors.firstname = 'Max length is 20 characters!'

        if (!values.lastname)
            errors.lastname = 'Required!'
        else if (values.lastname.length > 20)
            errors.lastname = 'Max length is 20 characters!'

        if (!values.email)
            errors.email = 'Required!'
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
            errors.email = 'Invalid Email!'

        if (!values.password)
            errors.password = 'Redquired!'
        else if (values.password.length < 5)
            errors.password = 'Password must be at least 5 characters long!'
        return errors
    }

    const onSubmit = values => {
        fetch('https://localhost:5000/signup', {
            method: 'POST',
            mode: 'cors',
            credentials : 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(response => response.json())
            .then(data => {
                if(!data.error){
                    console.log(data)
                    setRoute(true)
                }
                else console.log('User Already Exists')
            }).catch(err => console.log(err))
    }
    const formik = useFormik({
        initialValues,
        validate,
        onSubmit,
    })
    const classes = useStyles();
    return (
        <div className={classes.paper}>
            {route && <Redirect to={{pathname: "/home"}}/>}
            <CssBaseline />
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="firstname"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstname"
                            label="First Name"
                            autoFocus
                            {...formik.getFieldProps('firstname')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="lastname"
                            label="Last Name"
                            name="lastname"
                            {...formik.getFieldProps('lastname')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            {...formik.getFieldProps('email')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            {...formik.getFieldProps('password')}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign Up
                </Button>
                <Typography>
                    By SigningUp you agree to our{" "} 
                        <b><a href='/'>Privacy Policy</a></b> &{" "} 
                        <b><a href='/'>terms of use</a></b>
                </Typography>
            </form>
        </div>
    )
}
export default Signup 