import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import { CssBaseline, AppBar, Toolbar, Container, Button, Grid } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import BookmarkList from './BookmarkList';
import FirebaseService from './FirebaseService';

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

const UserContext = React.createContext<UserType>({isLoggedIn: false, name: ''});
const UserProvider = UserContext.Provider;
export const useUserContext = () => {
  return React.useContext(UserContext);
}

const BookmarkHome: React.FC = () => {

  const classes = useStyles();

  const [user, setUser] = React.useState<UserType>({ isLoggedIn: false, name: '' });

  React.useEffect(() => {
    FirebaseService.onAuthStateChange(setUser);
  }, []);

  const handleLogout = () => {
    console.log('handleLogout');
    FirebaseService.logout();
  }

  return (
    <React.Fragment>
      <CssBaseline />

      <AppBar className={classes.appBarColor} position="relative">
        <Toolbar>
          <BookmarksIcon className={classes.right_space} />
          <Typography variant="h6" color="inherit" noWrap style={{ flex: 1 }}>
            React Bookmarks
          </Typography>
          {user.isLoggedIn &&
            <React.Fragment>
              <Typography variant="subtitle1" className={classes.right_space} color="inherit" noWrap>
                Hallo {user.name}
              </Typography>
              <Button color="inherit" variant="outlined" onClick={handleLogout}>Logout</Button>
            </React.Fragment>
          }
          {!user.isLoggedIn &&
            <React.Fragment>
              <Button type="submit" color="inherit" className={classes.right_space} variant="outlined" component={RouterLink} to="/register">Registrierung</Button>
              <Button type="submit" color="inherit" variant="outlined" component={RouterLink} to="/login">Login</Button>
            </React.Fragment>
          }
        </Toolbar>
      </AppBar>

      <main>
        <div className={classes.mainContent}>
          <Container maxWidth="lg">
            <Typography component="h3" variant="h4" align="center" color="textPrimary" gutterBottom>
              React Bookmarks
            </Typography>
            <UserProvider value={user}>
              <BookmarkList />
            </UserProvider>
          </Container>
        </div>
      </main>

      <footer className={classes.footer}>
        {!user.isLoggedIn &&
          <Grid container spacing={0} direction="column" alignItems="center">
            <Button type="submit" color="inherit" variant="outlined" component={RouterLink} to="/register">Registrierung</Button>
          </Grid>
        }
        <Typography className={classes.footerText} variant="subtitle1" align="center" color="textSecondary" component="p">
          Dirk Mittmann 2020
        </Typography>
      </footer>

    </React.Fragment>
  );
}

export default BookmarkHome;
