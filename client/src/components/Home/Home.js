import React, { useState, useEffect } from 'react'
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import Feed from './Feed/Feed'
import Notifications from './Notifications/Notifications'
import Messages from './Messages/Messages'
import Profile from './Profile/Profile'
import CreateTopic from './CreateTopic/CreateTopic'
import Topic from './Topic/Topic'
import Error404 from '../Error404/Error404'
import './Home.css'
const Home = () => {
    let match = useRouteMatch()
    const [valid, SetValid] = useState(true)
    useEffect(() => {
        fetch('https://localhost:5000', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                data.user !== 'authenticated' && SetValid(false)
            })
    }, [])
    return (
        <Grid container direction='column'>
            {valid === false ? <Redirect to={{ pathname: '/' }} /> : null}
            <Switch>
                <Route path={`${match.path}`} component={Feed} exact={true} />
                <Route path={`${match.path}/notifications`} component={Notifications} />
                <Route path={`${match.path}/topic`} component={Topic} />
                <Route path={`${match.path}/messages`} component={Messages} />
                <Route path={`${match.path}/profile`} component={Profile} />
                <Route path={`${match.path}/createtopic`} component={CreateTopic} />
                <Route component={Error404} />
            </Switch>
        </Grid>
    )
}

export default Home