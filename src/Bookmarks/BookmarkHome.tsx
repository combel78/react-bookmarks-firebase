import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import { CssBaseline, AppBar, Toolbar, Container, Button, Grid } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import BookmarkList from './BookmarkList';

const useStyles = makeStyles(theme => ({
  appBarColor: {
    backgroundColor: '#625750',
  },
  right_space: {
    marginRight: theme.spacing(2),
  },
  mainContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  footerText: {
    marginTop: theme.spacing(2),
  },
}));

const BookmarkHome = () => {

  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />

      <AppBar className={classes.appBarColor} position="relative">
        <Toolbar>
          <BookmarksIcon className={classes.right_space} />
          <Typography variant="h6" color="inherit" noWrap style={{ flex: 1 }}>
            React Bookmarks
          </Typography>
          <Button type="submit" color="inherit" className={classes.right_space} variant="outlined" component={RouterLink} to="/register">Registrierung</Button>
          <Button type="submit" color="inherit" variant="outlined" component={RouterLink} to="/login">Login</Button>
        </Toolbar>
      </AppBar>

      <main>
        <div className={classes.mainContent}>
          <Container maxWidth="lg">
            <Typography component="h3" variant="h4" align="center" color="textPrimary" gutterBottom>
              React Bookmarks
            </Typography>
            <BookmarkList />
          </Container>
        </div>
      </main>

      <footer className={classes.footer}>
        <Grid container spacing={0} direction="column" alignItems="center">
          <Button type="submit" color="inherit" variant="outlined" component={RouterLink} to="/register">Registrierung</Button>
        </Grid>
        <Typography className={classes.footerText} variant="subtitle1" align="center" color="textSecondary" component="p">
          Dirk Mittmann 2020
        </Typography>
      </footer>

    </React.Fragment>
  );
}

export default BookmarkHome;
