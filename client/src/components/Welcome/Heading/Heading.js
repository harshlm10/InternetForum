import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import CasinoIcon from '@material-ui/icons/Casino';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  appbar: {
    background: "#97a8c2"
  },
  name: {
    margin: '0px 0px 0px 10px'
  }
}))

const Heading = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar className={classes.appbar} position='static'>
        <Toolbar>
          <Grid container justify='flex-end'>
            <Grid item>
              <CasinoIcon fontSize='large' />
            </Grid>
          </Grid>
          <Grid container className={classes.name}>
            <Typography variant='h3'>
              header
              <Typography>footer</Typography>
            </Typography>
          </Grid>
          <Grid container >
            <Button variant='outlined'>Dark Mode</Button>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  )
}
export default Heading