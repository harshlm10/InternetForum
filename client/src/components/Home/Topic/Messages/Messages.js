import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message';
import { css } from 'glamor';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    container : {
        margin : '10px 0px 10px 0px'
    }
})
const ROOT_CSS = css({
    height: 450,
    width: '100%'
});

const Messages = props => {
    const classes = useStyles()
    return (
        <Grid item container>
            <Grid item xs={2}></Grid>
            <Grid item container xs={8} className={classes.container}>
                <ScrollToBottom className={`${ROOT_CSS}`}>
                    {props.messages.map((message, i) => <Message key={i} message={message} name={props.name} />)}
                </ScrollToBottom>
            </Grid>
            <Grid item xs={2}></Grid>
        </Grid>
    )
}

export default Messages