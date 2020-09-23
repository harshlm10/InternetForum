import React, { useState, useEffect } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import { Grid, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Button } from '@material-ui/core'
import Header from './Header/Header'
import RightBar from './RightBar/RightBar'
import Trending from './Trending/Trending'
import './Feed.css'
import photo from './God.jpg'
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    TrendingOuterContainer: {
        padding: '10px 10px 10px 10px',
        margin: '0px 0px 10px 0px',
        background: '#f2f2f2',
        position: 'fixed'
    },
    FeedContainer: {
        padding: '20px 15px 0px 15px',
        background: '#f2f2f2',
        margin: '0px 0px 0px 370px'
    },
    RightContainer: {
        background: 'aqua',
        position: 'relative'
    },
    card: {
        borderRadius: '15px',
        margin: '20px 0px 0px 0px'
    },
    media: {
        height: '300px',
    },
    TopicAction: {
        display: 'flex',
        justifyContent: 'center',
    }, button: {
        margin: '0px 5px 0px 5px'
    },
    TopicInfo: {
        display: 'flex',
        justifyContent: 'center'
    },
    TopicPhoto: {
        display: 'block'
    }
}))

const Feed = () => {
    const classes = useStyles();
    const [items] = useState(Array.from({ length: 1 }))
    const [end, setEnd] = useState(true)
    const [gotTopics, setgotTopics] = useState(false)
    const [allTopics, setAllTopics] = useState([])
    const [join, setJoin] = useState(false)
    const [topicdata, setTopicData] = useState({ data: '' })

    useEffect(() => {
        fetch('https://localhost:5000/home/feed', {
            method: "GET",
            mode: "cors",
            credentials: 'include'
        }).then(response => response.json())
            .then(data => {
                if (!data.error && data.count === 0) {
                    setAllTopics(() => data.topics.map(topic => topic))
                    setEnd(false)
                    setgotTopics(true)
                }
                else {
                    setAllTopics(() => data.topics.map(topic => topic))
                    setgotTopics(true)
                }
            })
    }, [])

    const handleClick = i => {
        setTopicData({ data: i })
        setJoin(true)
    }
    const fetchMoreData = () => {
        setEnd(false)
        return
    };
    return (
        <React.Fragment>
            {topicdata.data && join && <Redirect push to={{
                pathname: '/home/topic',
                state: topicdata
            }} />}
            <Header />
            <Grid item container xs={12} direction='row'>
                <Grid item container xs={3} direction='column' className={classes.TrendingOuterContainer}>
                    <Trending />
                </Grid>
                <Grid item container xs={6} className={classes.FeedContainer} direction='column'>
                    <InfiniteScroll
                        dataLength={items.length}
                        next={fetchMoreData}
                        hasMore={end}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <h1 style={{ textAlign: 'center' }}>
                                Yay! You have seen it all
                            </h1>
                        }
                    >
                        {gotTopics && (allTopics.map((i, index) => (
                            <Card className={classes.card} key={index}>
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="recipe" className={classes.avatar}>
                                            R
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                    }
                                    title={`${i.CreatedBy}`}
                                    subheader={`${i.createdAt}`}
                                />
                                <Container className={classes.TopicPhoto}>
                                    <CardMedia
                                        className={classes.media}
                                        image={`${photo}`}
                                        title="Paella dish"
                                    />
                                </Container>
                                <CardContent>
                                    <Typography variant='h6'>
                                        {i.heading}
                                    </Typography>
                                    <Typography variant='body1'>
                                        {i.description}
                                    </Typography>
                                </CardContent>
                                <Container className={classes.TopicInfo}>
                                    <Typography>Viewers - {`${i.Viewers}`}</Typography>
                                </Container>
                                <Container className={classes.TopicInfo}>
                                    <Typography>Members - {`${i.Members}`}/30</Typography>
                                </Container>
                                <Container className={classes.TopicAction}>
                                    <CardActions disableSpacing >
                                        <Button
                                            variant='outlined'
                                            className={classes.button}
                                            onClick={
                                                (e) => {
                                                    e.preventDefault()
                                                    handleClick(i)
                                                }
                                            }> Join </Button>
                                        <Button variant='outlined' className={classes.button}> View </Button>
                                        <Button variant='outlined' className={classes.button}> Share </Button>
                                        <Button variant='outlined' className={classes.button}> Save </Button>
                                    </CardActions>
                                </Container>
                            </Card>
                        )))}
                    </InfiniteScroll>
                </Grid>
                <Grid item container xs={3} className={classes.RightContainer} direction='column'>
                    <RightBar />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Feed