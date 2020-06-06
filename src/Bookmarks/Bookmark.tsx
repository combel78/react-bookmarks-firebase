import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import { Grid, Paper, Typography, Link, IconButton } from "@material-ui/core";
import BookmarkEditForm from "./BookmarkEditForm";
import { useUserContext } from './BookmarkHome';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
}));

interface BookmarkProps {
    bookmark: BookmarkType,
    onBookmarkSave: any,
    onBookmarkDelete: any,
}

const Bookmark: React.FC<BookmarkProps> = (bookmarkProps) => {

    const classes = useStyles();

    const user = useUserContext();

    const [currBookmark, setCurrentBookmark] = React.useState(bookmarkProps.bookmark);

    const [editFormOpen, setEditFormOpen] = React.useState(false);

    const handleBookmarkEditFormOpen = () => {
        setEditFormOpen(true);
    }

    const handleBookmarkEditFormClose = () => {
        setEditFormOpen(false);
    }

    const handleBookmarkEditFormSave = (bookmark: BookmarkType) => {
        setCurrentBookmark(bookmark);
        setEditFormOpen(false);
        bookmarkProps.onBookmarkSave(bookmark);
    }

    const handleBookmarkEditFormDelete = (bookmark: BookmarkType) => {
        setEditFormOpen(false);
        bookmarkProps.onBookmarkDelete(bookmark);
    }

    return(
        <React.Fragment>
            <BookmarkEditForm open={editFormOpen} bookmark={currBookmark} onClose={handleBookmarkEditFormClose} onSave={handleBookmarkEditFormSave} onDelete={handleBookmarkEditFormDelete} />
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Grid container>
                            <Grid item xs={10}>
                                <Typography variant="h6" align="left" gutterBottom>
                                    <Link data-testid="bookmark-link-element" href={currBookmark.url} target="_blank" rel="noreferrer">{currBookmark.name}</Link>
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Grid container justify="flex-end">
                                { user.isLoggedIn &&
                                    <IconButton size="small" color="primary" onClick={handleBookmarkEditFormOpen}>
                                        <EditIcon />
                                    </IconButton>
                                }
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" align="left" data-testid="bookmark-descr-element">{currBookmark.description}</Typography>
                            </Grid>                            
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Bookmark;