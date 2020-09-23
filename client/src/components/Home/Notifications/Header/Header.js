import React, { useState } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Grid, Avatar, Button, Popover, } from '@material-ui/core'

import './Header.css'

const useStyles = makeStyles((theme) => ({
    FeedContainer: {
        padding: '15px 0px 15px 85px'
    },
    MessageContainer: {
        padding: '15px 0px 15px 35px',
    },
    NotificationContainer: {
        padding: '15px 0px 15px 35px'
    },
    CreateTopicContainer: {
        padding: '15px 0px 15px 0px '
    },
    link: {
        color: 'black',
        fontSize: '20px'
    },
}));

const Header = () => {
    const [route, setRoute] = useState(false)
    const [profile, setProfile] = useState(false)
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfile = (e) => {
        e.preventDefault()
        setProfile(true)
    }
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const handleLogout = (e) => {
        e.preventDefault()
        fetch('https://localhost:5000/logout', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setRoute(true)
            })
            .catch(err => console.log(err))
    }
    return (
                <AppBar position="sticky" color='default' elevation={0}>
                    {route && <Redirect to={{ pathname: "/" }} />}
                    {profile && <Redirect to='/home/profile' />}
                    <Grid container className={classes.OuterContainer}>
                        <Grid item xs={3} ></Grid>
                        <Grid item container xs={6} justify='flex-start' className={'as'}>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={2} className={classes.FeedContainer}>
                                <NavLink
                                    className={classes.link}
                                    exact to={`/home`}
                                    activeClassName='NavFeed'>
                                    Feed
                        </NavLink>
                            </Grid>
                            <Grid item xs={2} className={classes.NotificationContainer}>
                                <NavLink
                                    className={classes.link}
                                    to={`/home/notifications`}
                                    activeClassName="NavNotification">
                                    Notifications
                        </NavLink>
                            </Grid>
                            <Grid item xs={2} className={classes.MessageContainer}>
                                <NavLink
                                    to={`/home/messages`}
                                    className={classes.link}
                                    activeClassName="NavMessage">
                                    Messages
                        </NavLink>
                            </Grid>
                            <Grid item xs={2} className={classes.CreateTopicContainer}>
                                <NavLink
                                    className={classes.link}
                                    to={`/home/createtopic`}
                                    activeClassName="NavCreateTopic">
                                    Create Topic
                        </NavLink>
                            </Grid>
                            <Grid item xs={1}>
                                <Button aria-describedby={id} onClick={handleClick}>
                                    <Avatar>HS</Avatar>
                                </Button>
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                >
                                    <Button onClick={handleProfile}>Profile</Button>
                                    <br />
                                    <Button onClick={handleLogout}>Logout</Button>
                                </Popover>
                            </Grid>
                            <Grid item xs={1}></Grid>
                        </Grid>
                        <Grid item xs={3}></Grid>
                    </Grid>
                </AppBar>
    )
}

export default Header