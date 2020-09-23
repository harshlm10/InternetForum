import React from 'react'
import { Grid, Avatar, Typography, IconButton } from '@material-ui/core'
import MoreIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    OuterContainer: {
        margin: '10px 0px 0px 0px',
        background: '#f2f2f2'
    },
    TopicHeadingContainer: {
        margin: '10px 0px 0px 0px'
    },
    TopicOptions: {

    },
    TopicHeading: {
        pading: '0px 0px 0px 0px',
        lineHeight: '1.35',
        letterSpacing: '0.5px',
        fontWeight: 'bolder'
    },
    TopicDescription:{
        padding : '0px 0px 0px 0px',
        lineHeight : '1.35',
        letterSpacing : '0.5px',
    },
    AdminInfoContainer: {
        padding: "5px 0px 0px 0px"
    },
    AdminAvatar: {

    },
    AdminName: {
        margin: '5px 0px 0px 5px'
    },
    TopicMembersInfo: {
        margin: '7px 0px 0px 0px'
    },
    TopicViewersInfo: {
        margin: '6px 0px 0px 0px'
    },
    TopicTimeInfo:{
        margin: '5px 0px 0px 0px'
    }
});


const TopicInfo = (props) => {
    const name = props.admin.split(" ")
    const classes = useStyles()
    return (
        <Grid item container className={classes.OuterContainer}>
            <Grid item xs={2}></Grid>
            <Grid item container xs={8}>
                <Grid item xs={11} className={classes.TopicHeadingContainer}>
                    <Typography variant='h6' className={classes.TopicHeading}>
                        {props.heading}
                    </Typography>
                </Grid>
                <Grid item xs={1} className={classes.TopicOptions}>
                    <IconButton><MoreIcon /></IconButton>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='subtitle2' className={classes.TopicDescription}>
                        {props.description}
                    </Typography>
                </Grid>
                <Grid container item xs={3} className={classes.AdminInfoContainer}>
                    <Avatar className={classes.AdminAvatar}>
                    {`${name[0][0]}${name[1][0]}`}
                    </Avatar>
                    <Typography variant='body1' className={classes.AdminName}>
                        {props.admin}
                    </Typography>
                </Grid>
                <Grid item xs={2} className={classes.TopicMembersInfo}>
                    <Typography>
                        {`Members - ${props.Members}/30`}
                    </Typography>
                </Grid>
                <Grid item xs={2} className={classes.TopicViewersInfo}>
                    <Typography>
                        {`Viewers - ${props.Viewers}`}
                    </Typography>
                </Grid>
                <Grid item xs={4} className={classes.TopicTimeInfo}>
                    <Typography>
                        Time Remaining - 00:00:00
                    </Typography>
                </Grid> 
            </Grid>
            <Grid item xs={2}></Grid>
        </Grid>
    )
}

export default TopicInfo