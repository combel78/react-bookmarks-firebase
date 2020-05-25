const initialBookmarks: Array<BookmarkType> = [
    {
        name: "ReactJs",
        url: "http://www.reactjs.org",
        description: "React Start Page"
    },
    {
        name: "Create React App",
        url: "https://create-react-app.dev",
        description: "create-react-app ist eine Starthilfe zur Erstellung von React-Projekten"
    },
    {
        name: "A Guide to Flexbox",
        url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
        description: "Flexbox CSS Tutorial"
    }
];

class BookmarkService {

    /* liefere alle Bookmarks */
    getBookmarks() {
        return this.getBookmarksSort(0);
    }

    /* liefere alle Bookmarks mit Sortierung */
    getBookmarksSort(sortType: number) {
        //wenn der localStorage leer ist, befülle diesen mit den drei initialen Datensätzen
        if(!localStorage.getItem('bookmarks')) {
            initialBookmarks.map((b) => this.addBookmark(b));
        }
        const bookmarks: Array<BookmarkType> = JSON.parse(localStorage.getItem('bookmarks') || '');
        if(sortType === 0) {
            //nach id
            bookmarks.sort((a: BookmarkType, b: BookmarkType) => (a.id || 0) < (b.id || 0) ? -1 : (a.id || 0) > (b.id || 0) ? 1 : 0);
        }
        if(sortType === 1) {
            //nach id absteigend
            bookmarks.sort((a: BookmarkType, b: BookmarkType) => (a.id || 0) > (b.id || 0) ? -1 : (a.id || 0) < (b.id || 0) ? 1 : 0);
        }
        if(sortType === 2) {
            //nach name
            bookmarks.sort((a: BookmarkType, b: BookmarkType) => (a.name || '') < (b.name || '') ? -1 : (a.name || '') > (b.name || '') ? 1 : 0);
        }
        if(sortType === 3) {
            //nach name absteigend
            bookmarks.sort((a: BookmarkType, b: BookmarkType) => (a.name || '') > (b.name || '') ? -1 : (a.name || '') > (b.name || '') ? 1 : 0);
        }
        return bookmarks;
    }

    /* füge eine Bookmark hinzu */
    addBookmark(bookmark: BookmarkType) {
        if(bookmark !== undefined) {
            const bookmarks: Array<BookmarkType> = JSON.parse(localStorage.getItem('bookmarks') || '[]');
            let maxId: number = 0;
            bookmarks.map((b) => maxId = Math.max(maxId, (b.id || 0)));
            bookmark.id = (maxId + 1);
            bookmarks.push(bookmark);
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        }
    }

    /* aktualisiere eine Bookmark anhand ihrer id */
    updateBookmark(bookmark: BookmarkType) {
        if(bookmark && bookmark.id) {
            const bookmarks: Array<BookmarkType> = JSON.parse(localStorage.getItem('bookmarks') || '[]');
            bookmarks.map((b, i) => {
                if(b.id === bookmark.id) {
                    bookmarks.splice(i, 1, bookmark);
                }
                return true;
            })
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        }
    }

    /* lösche eine Bookmark */
    deleteBookmark(bookmark: BookmarkType) {
        if(bookmark && bookmark.id) {
            const bookmarks: Array<BookmarkType> = JSON.parse(localStorage.getItem('bookmarks') || '[]');
            bookmarks.map((b, i) => {
                if(b.id === bookmark.id) {
                    bookmarks.splice(i, 1);
                }
                return true;
            })
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        }
    }
}

export default BookmarkService;