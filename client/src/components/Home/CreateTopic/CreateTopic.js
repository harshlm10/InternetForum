import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import Header from './Header/Header'
import Typography from '@material-ui/core/Typography';
import './CreateTopic.css'
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    HeadingContainer: {
        padding: '10px 0px 10px 0px'
    },
    ContentHeadingContainer: {
        margin: "15px 0px 0px 0px"
    }
}))

const CreateTopic = () => {
    const classes = useStyles();
    const [route, setRoute] = useState(false);
    const [ContentHeading, setContentHeading] = useState('')
    const [ContentDescription, setContentDescription] = useState('')
    const [HeadingError, setHeadingError] = useState(false)
    const [display, setDisplay] = useState(true)

    const handleClick = (e) => {
        e.preventDefault()
        if (!ContentHeading) {
            setHeadingError(true)
            return
        }
        else {
            setHeadingError(false)
            setDisplay(false)
            fetch('https://localhost:5000/home/createtopic', {
                method: 'POST',
                mode: 'cors',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ContentHeading,
                    ContentDescription
                })
            }).then(response => response.json()).then(data => {
                    if (!data.error)
                        setRoute(true);
                    else {
                        console.log('some error occured!')
                    }
                }).catch((err) => console.log(err));
        }
    }
    return (
        <React.Fragment>
            {route && <Redirect to={{ pathname: "/home" }} />}
            {display ? <>
                <Header />
                <Grid item xs={12} className={classes.HeadingContainer}>
                    <Typography
                        variant='h5'
                        align='center'>
                        Create a Topic
                    </Typography>
                </Grid>
                <Grid item container className={classes.ContentHeadingContainer}>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                        <TextField
                            autoFocus
                            fullWidth
                            id='ContentHeading'
                            multiline
                            name='ContentHeading'
                            onChange={(e) => setContentHeading(e.target.value)}
                            placeholder='Topic Heading'
                            rows={5}
                            rowsMax={7}
                            value={ContentHeading}
                            variant='outlined'
                        />
                    </Grid>
                    <Grid item xs={4}></Grid>
                    {HeadingError ? <Grid item xs={12}>
                        <Typography
                            variant='h6'
                            align='center'
                            color='secondary'>
                            Heading is Required!.
                        </Typography>
                    </Grid> : null}
                </Grid>
                <Grid item container className={classes.ContentHeadingContainer}>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            id='ContentDescription'
                            multiline
                            name='ContentDescription'
                            onChange={(e) => setContentDescription(e.target.value)}
                            placeholder='Topic Decription (Optional)'
                            rows={4}
                            rowsMax={7}
                            value={ContentDescription}
                            variant='outlined'
                        />
                    </Grid>
                    <Grid item xs={4}></Grid>
                </Grid>
                <Grid item container className={classes.ContentHeadingContainer}>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                        <Button
                            color='primary'
                            size='large'
                            variant='outlined'
                            fullWidth
                            onClick={handleClick}>
                            Add Topic
                    </Button>
                    </Grid>
                    <Grid item xs={4}></Grid>
                </Grid>
            </> :
                <h1>
                    Loading...
            </h1>}
        </React.Fragment>
    )
}

export default CreateTopic