import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Button, FormControl, InputLabel, Input, Grid, Paper, Avatar } from '@material-ui/core';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    mainContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6, 0, 6),
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(8),
    },
    avatar: {
        margin: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(6),
        alignItems: 'center',
    },
    formControl: {
        marginBottom: theme.spacing(2),
    },
    formButton: {
        marginTop: theme.spacing(2),
    },
}));

const Register: React.FC = () => {

    const classes = useStyles();

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <React.Fragment>
            <Grid container spacing={4}>
                <Grid item xs={3} />
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Typography variant="h6" color="inherit" noWrap>
                            React Bookmarks Registrierung
                        </Typography>
                        <Avatar className={classes.avatar}>
                            <BookmarksIcon />
                        </Avatar>

                        <form className={classes.form} onSubmit={e => e.preventDefault()}>
                            <FormControl className={classes.formControl} required fullWidth>
                                <InputLabel htmlFor="name">Name</InputLabel>
                                <Input id="name" name="name" autoComplete="off" autoFocus value={name} onChange={e => setName(e.target.value)} />
                            </FormControl>
                            <FormControl className={classes.formControl} required fullWidth>
                                <InputLabel htmlFor="email">E-Mail</InputLabel>
                                <Input id="email" name="email" autoComplete="off" value={email} onChange={e => setEmail(e.target.value)} />
                            </FormControl>
                            <FormControl className={classes.formControl} required fullWidth>
                                <InputLabel htmlFor="password">Passwort</InputLabel>
                                <Input type="password" id="password" name="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)} />
                            </FormControl>
                            <FormControl className={classes.formControl} fullWidth>
                                <Button type="submit" className={classes.formButton} variant="contained" color="primary">Registrieren</Button>
                            </FormControl>
                        </form>

                    </Paper>
                </Grid>
                <Grid item xs={3} />
            </Grid>
            <Grid container spacing={0} direction="column" alignItems="center">
                <Button	type="submit" className={classes.formButton} color="inherit" variant="outlined" component={RouterLink} to="/">zurück</Button>
            </Grid>
        </React.Fragment>
    )
}

export default Register;