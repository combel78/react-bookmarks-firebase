import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import { CssBaseline, AppBar, Toolbar, Container } from '@material-ui/core';
import BookmarkList from './BookmarkList';

const useStyles = makeStyles(theme => ({
  appBarColor: {
    backgroundColor: '#625750',
  },
  icon: {
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
}));

function App() {

  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />

      <AppBar className={classes.appBarColor} position="relative">
        <Toolbar>
          <BookmarksIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            React Bookmarks
          </Typography>
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
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Dirk Mittmann 2020
        </Typography>
      </footer>

    </React.Fragment>
  );
}

export default App;
