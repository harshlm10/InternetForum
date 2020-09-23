import React from 'react'
import { Grid, Typography, Button, Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { css } from 'glamor';
import ScrollToBottom from 'react-scroll-to-bottom';
import './Trending.css'
const useStyles = makeStyles((theme) => ({
    InnerContainer: {
        margin: '0px 0px 10px 0px',
        borderRadius: '15px',
        background: 'white',
        boxShadow: '1px 1px'
    },
    TrendingTopicHeading: {
        fontWeight: "bold",
        fontSize: "20px",
        lineHeight: '1',
        fontFamily: 'Times,Times New Roman'
    },
    small: {
        height: theme.spacing(6),
        width: theme.spacing(6),
        margin: '5px 0px 0px 10px'
    },
    TrendingAdminName: {
        margin: '5px 0px 0px 5px'
    },
    TrendingTopicTime: {
        margin: '5px 0px 0px 5px'
    },
    TrendingAction: {
        margin: '10px 0px 0px 0px',
        justify: 'center'
    },
    TrendingTopicInfoContainer: {
        margin: '0px 0px 0px 5px'
    }
}))
const ROOT_CSS = css({
    height: 680,
    width: '100%'
});
const InnerTrending = () => {
    const classes = useStyles();
    return (
        <Grid container item xs={12} direction='column' className={classes.InnerContainer}>
            <Grid item xs={12}>
                <Typography variant='subtitle1' className={classes.TrendingTopicHeading}>
                    Trending Topic 1
                    </Typography>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={2}>
                    <Avatar className={classes.small}>AN</Avatar>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant='subtitle2' className={classes.TrendingAdminName}>
                        Admin Name
                        </Typography>
                    <Typography variant='caption' className={classes.TrendingTopicTime}>
                        Time
                        </Typography>
                </Grid>
            </Grid>
            <Grid item container xs={12}>
                <Grid item container xs={7} direction='column' className={classes.TrendingTopicInfoContainer}>
                    <Grid item xs={12} >
                        <Typography variant='body2'>
                            Members = 56
                            </Typography>
                    </Grid>
                    <Grid item xs={12} >
                        <Typography variant='body2'>
                            Viewers = 2056
                            </Typography>
                    </Grid>
                    <Grid item xs={12} >
                        <Typography variant='body2'>
                            Time Remaining = 03:04:56
                            </Typography>
                    </Grid>
                </Grid>
                <Grid item container xs={12} className={classes.TrendingAction} alignItems='center'>
                    <Grid item xs={6}>
                        <Button>Join</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button>View</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
const Trending = () => {
    return (
        <ScrollToBottom className={`${ROOT_CSS}`} mode='top'>
            <React.Fragment>
                <Grid item xs={12}>
                    <Typography variant='h6' align='center'>
                        Trending
                    </Typography>
                </Grid>
                <InnerTrending />
                <InnerTrending />
                <InnerTrending />
                <InnerTrending />
                <InnerTrending />
                <InnerTrending />
                <InnerTrending />
                <InnerTrending />
                <InnerTrending />
                <InnerTrending />
            </React.Fragment>
        </ScrollToBottom>
    )
}

export default Trending