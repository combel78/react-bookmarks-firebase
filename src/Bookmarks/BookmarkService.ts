import FirebaseService from "./FirebaseService";

const initialBookmarks: Array<BookmarkType> = [
    {
        id: 1,
        name: "ReactJs",
        url: "http://www.reactjs.org",
        description: "React Start Page"
    },
    {
        id: 2,
        name: "Create React App",
        url: "https://create-react-app.dev",
        description: "create-react-app ist eine Starthilfe zur Erstellung von React-Projekten"
    },
    {
        id: 3,
        name: "A Guide to Flexbox",
        url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
        description: "Flexbox CSS Tutorial"
    }
];

class BookmarkService {

    /* Firestore-Objekt */
    private db: firebase.firestore.Firestore = FirebaseService.getDb();

    /* liefere alle Bookmarks */
    public onBookmarks = (setBookmarksCallback: any) => {
        const docRef = this.db.collection('bookmarks').doc('bookmarkData');
        docRef.get().then((document) => {
            if(document.exists) {
                docRef.onSnapshot((doc: any) => {
                    setBookmarksCallback(JSON.parse(doc.data()['bookmarks']));
                })                
            } else {
                this.saveBookmarksFirestore(JSON.stringify(initialBookmarks));
                setBookmarksCallback(initialBookmarks);
            }
        });
    }

    /* liefere alle Bookmarks mit Sortierung */
    public bookmarksSort(sortType: number, bookmarks: Array<BookmarkType>, setBookmarksCallback: any) {
        if (sortType === 0) {
            //nach id
            bookmarks.sort((a: BookmarkType, b: BookmarkType) => (a.id || 0) < (b.id || 0) ? -1 : (a.id || 0) > (b.id || 0) ? 1 : 0);
        }
        if (sortType === 1) {
            //nach id absteigend
            bookmarks.sort((a: BookmarkType, b: BookmarkType) => (a.id || 0) > (b.id || 0) ? -1 : (a.id || 0) < (b.id || 0) ? 1 : 0);
        }
        if (sortType === 2) {
            //nach name
            bookmarks.sort((a: BookmarkType, b: BookmarkType) => (a.name || '') < (b.name || '') ? -1 : (a.name || '') > (b.name || '') ? 1 : 0);
        }
        if (sortType === 3) {
            //nach name absteigend
            bookmarks.sort((a: BookmarkType, b: BookmarkType) => (a.name || '') > (b.name || '') ? -1 : (a.name || '') > (b.name || '') ? 1 : 0);
        }
        setBookmarksCallback(bookmarks);
    }

    /* speichere ein Bookmarks-Array */
    private saveBookmarksFirestore(bookmarks: string) {
        const docRef = this.db.collection('bookmarks').doc('bookmarkData');
        docRef.set({
            bookmarks: bookmarks
        });
    }

    /* füge eine Bookmark hinzu */
    public addBookmark = (bookmarks: Array<BookmarkType>, bookmark: BookmarkType) => {
        if (bookmark !== undefined) {
            let maxId: number = 0;
            bookmarks.map((b) => maxId = Math.max(maxId, (b.id || 0)));
            bookmark.id = (maxId + 1);
            bookmarks.push(bookmark);
            this.saveBookmarksFirestore(JSON.stringify(bookmarks));
        }
    }

    /* aktualisiere eine Bookmark anhand ihrer id */
    public updateBookmark = (bookmarks: Array<BookmarkType>, bookmark: BookmarkType) => {
        if (bookmark && bookmark.id) {
            bookmarks.map((b, i) => {
                if (b.id === bookmark.id) {
                    bookmarks.splice(i, 1, bookmark);
                }
                return true;
            })
            this.saveBookmarksFirestore(JSON.stringify(bookmarks));
        }
    }

    /* lösche eine Bookmark */
    public deleteBookmark = (bookmarks: Array<BookmarkType>, bookmark: BookmarkType, setBookmarksCallback: any) => {
        if (bookmark && bookmark.id) {
            bookmarks.map((b, i) => {
                if (b.id === bookmark.id) {
                    bookmarks.splice(i, 1);
                }
                return true;
            })
            this.saveBookmarksFirestore(JSON.stringify(bookmarks));
            setBookmarksCallback(bookmarks);
        }
    }
}

export default BookmarkService;