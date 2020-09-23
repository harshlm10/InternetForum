import React from "react"
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import "./RightBar.css";
const useStyles = makeStyles((theme) => ({
  
}))
const RightBar = () => {
  const classes = useStyles()
  return (
    <Grid item container xs={12} className={classes.x} >
      <p>hello</p>
    </Grid>
  )
}

export default RightBar