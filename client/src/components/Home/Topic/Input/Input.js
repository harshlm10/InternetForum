import React from 'react';
import { Grid, Button, TextField,Icon } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    OuterContainer: {
        margin: '10px 0px 0px 0px',
        background: '#f2f2f2'
    },
})
const Input = (props) => {
    const classes = useStyles()
    return (
        <Grid className={classes.OuterContainer} container item>
            <Grid item xs={2}></Grid>
            <Grid container item xs={8}>
                <Grid item xs={10}>
                    <TextField className={classes.text}
                        name='MessageInput'
                        value={props.message}
                        onChange={event => props.setMessage(event.target.value)}
                        onKeyPress={event => event.key==='Enter' ? props.sendMessage(event) : null}
                        autoFocus={true}
                        fullWidth={true}
                        multiline={true}
                        placeholder="type here.."
                        variant='outlined'
                        rows={2} />
                </Grid>
                <Grid item xs={2}>
                    <Button 
                        color='default' 
                        disableElevation 
                        size='large' 
                        variant='outlined'
                        endIcon={<Icon>send</Icon>}
                        onClick={(event)=>props.sendMessage(event)}>
                        Send
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={2}></Grid>
        </Grid>
    )
}

export default Input