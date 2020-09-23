import React from "react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import "./Footer.css";

const Footer = () => {
  function Copyright() {
    return (
      <Typography variant="body2" align="center">
        {'Copyright © '}
        <Link href="https://material-ui.com/" color='initial'>
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  const footers = [
    {
      title: 'Company',
      description: ['Team', 'History', 'Contact us', 'Locations'],
    },
    {
      title: 'Features',
      description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
    },
  ];
  const useStyles = makeStyles((theme) => ({
    '@global': {
      ul: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },
    },
    footer: {
      background: 'black',
      color: 'White',
      padding: '20px 0px 0px 0px'
    },
    mystyle: {
      padding: '10px 20px 0px 20px'
    }
  }),
  );
  const classes = useStyles();
  return (
    <div>
      <Grid container justify='space-evenly' className={classes.footer}>
        <Grid item className={classes.mystyle}>
          {footers.map((footer) => (
            <Grid item key={footer.title}>
              <Typography variant="h6" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Box mt={2}>
          <Copyright />
        </Box>
      </Grid>
    </div>
  )
}
export default Footer;