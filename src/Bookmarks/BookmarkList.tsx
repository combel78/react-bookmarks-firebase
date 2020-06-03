import React from 'react';
import Bookmark from './Bookmark';
import { Grid, Select, MenuItem, Button } from '@material-ui/core';
import BookmarkService from './BookmarkService';
import BookmarkEditForm from './BookmarkEditForm';
import { useUserContext } from './BookmarkHome';

const BookmarkList: React.FunctionComponent = () => {

    const bookmarkService = new BookmarkService();
    
    const newBookmark: BookmarkType = {
        name: '',
        url: '',
        description: '',
    }

    const [bookmarks, setBookmarks] = React.useState<Array<BookmarkType>>([]);
    const [bookmarkSort, setBookmarkSort] = React.useState(0);
    const [addFormOpen, setAddFormOpen] = React.useState(false);
    const user = useUserContext();

    //lade Bookmarks
    React.useEffect(() => {
        const onBookmarksCallback = (newBookmarks: Array<BookmarkType>) => {
            if(bookmarks.length !== newBookmarks.length) {
                setBookmarks(newBookmarks);
            }
        }
        bookmarkService.onBookmarks(onBookmarksCallback);
    }, [bookmarkService, bookmarks.length]);

    const handleBookmarkSort = (event: React.ChangeEvent<{value: unknown}>) => {
        setBookmarkSort(event.target.value as number);
        bookmarkService.bookmarksSort(event.target.value as number, bookmarks, setBookmarks);
    }

    const handleBookmarkAddFormOpen = () => {
        setAddFormOpen(true);
    }

    const handleBookmarkAddFormClose = () => {
        setAddFormOpen(false);
    }

    const handleBookmarkAddFormSave = (bookmark: BookmarkType) => {
        setAddFormOpen(false);
        bookmarkService.addBookmark(bookmarks, bookmark);
    }

    const handleBookmarkSave = (bookmark: BookmarkType) => {
        bookmarkService.updateBookmark(bookmarks, bookmark);
    }

    const handleBookmarkDelete = (bookmark: BookmarkType) => {
        bookmarkService.deleteBookmark(bookmarks, bookmark, setBookmarks);
    }

    return (
        <React.Fragment>
            <Grid container spacing={4}>
                <Grid item xs={1}>
                { user.isLoggedIn &&
                    <React.Fragment>
                        <Button variant="contained" color="secondary" onClick={handleBookmarkAddFormOpen}>Neu</Button>
                        <BookmarkEditForm open={addFormOpen} onClose={handleBookmarkAddFormClose} onSave={handleBookmarkAddFormSave} bookmark={newBookmark} />
                    </React.Fragment>
                }                    
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
                            return <Bookmark bookmark={bookmark} key={bookmark.id} onBookmarkSave={handleBookmarkSave} onBookmarkDelete={handleBookmarkDelete} />
                        })
                    }
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default BookmarkList;