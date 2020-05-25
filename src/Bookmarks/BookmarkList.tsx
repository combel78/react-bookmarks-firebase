import React from 'react';
import Bookmark from './Bookmark';
import { Grid, Select, MenuItem, Button } from '@material-ui/core';
import BookmarkService from './BookmarkService';
import BookmarkEditForm from './BookmarkEditForm';

const BookmarkList: React.FunctionComponent = () => {

    const bookmarkService = new BookmarkService();
    const [bookmarks, setBookmarks] = React.useState(bookmarkService.getBookmarks());
    const [bookmarkSort, setBookmarkSort] = React.useState(0);
    const [addFormOpen, setAddFormOpen] = React.useState(false);

    const newBookmark: BookmarkType = {
        name: '',
        url: '',
        description: '',
    }

    const handleBookmarkSort = (event: React.ChangeEvent<{value: unknown}>) => {
        setBookmarkSort(event.target.value as number);
        setBookmarks(bookmarkService.getBookmarksSort(event.target.value as number));
    }

    const handleBookmarkAddFormOpen = () => {
        setAddFormOpen(true);
    }

    const handleBookmarkAddFormClose = () => {
        setAddFormOpen(false);
    }

    const handleBookmarkAddFormSave = (bookmark: BookmarkType) => {
        setAddFormOpen(false);
        bookmarkService.addBookmark(bookmark);
        handleReloadList();
    }

    const handleReloadList = () => {
        setBookmarks(bookmarkService.getBookmarksSort(bookmarkSort));
    }

    return (
        <React.Fragment>
            <Grid container spacing={4}>
                <Grid item xs={1}>
                    <React.Fragment>
                        <Button variant="contained" color="secondary" onClick={handleBookmarkAddFormOpen}>Neu</Button>
                        <BookmarkEditForm open={addFormOpen} onClose={handleBookmarkAddFormClose} onSave={handleBookmarkAddFormSave} bookmark={newBookmark} />
                    </React.Fragment>                    
                </Grid>
                <Grid item xs={9} />
                <Grid item xs={2}>
                    <Grid container justify="flex-end">
                        <Select id="selectBookmarkSort" value={bookmarkSort} onChange={handleBookmarkSort}>
                            <MenuItem value={0}>Reihenfolge</MenuItem>
                            <MenuItem value={1}>Reihenfolge, umgekehrt</MenuItem>
                            <MenuItem value={2}>alphabetisch</MenuItem>
                            <MenuItem value={3}>alphabetisch, umgekehrt</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    {
                        bookmarks.map((bookmark: BookmarkType) => {
                            return <Bookmark bookmark={bookmark} key={bookmark.id} onReloadList={handleReloadList} />
                        })
                    }
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default BookmarkList;