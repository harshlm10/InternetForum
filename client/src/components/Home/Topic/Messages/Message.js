import React from 'react';
import { Grid, Avatar, Typography } from '@material-ui/core'
import ReactEmoji from 'react-emoji';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    background: 'grey',
    margin : "10px 0px 10px 0px"
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  avatarcontainer: {
    padding: '0px 5px 0px 0px'
  }
}))

const Message = ({ message: { text, user }, name }) => {
  const classes = useStyles()
  const AvatarName = name.split(" ")

  return (
    <Grid item container xs={12} className={classes.container}>
      <Grid container item xs={1} justify='flex-end' className={classes.avatarcontainer}>
        <Avatar className={classes.avatar}>
          {`${AvatarName[0][0]}${AvatarName[1][0]}`}
        </Avatar>
      </Grid>
      <Grid item container xs={11} className={classes.some} direction='column'>
        <Grid>
          <Typography variant='subtitle2'>
            {name}
          </Typography>
        </Grid>
        <Grid>
          <Typography>
            {ReactEmoji.emojify(text)}
          </Typography>
        </Grid>
        <Grid item container >
          <Grid xs={4}><Typography>TimeStamp</Typography></Grid>
          <Grid xs={8} item container justify='flex-end'><Typography>Admin</Typography></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Message;