import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
}

class FirebaseService {

    private auth: firebase.auth.Auth;
    private db: firebase.firestore.Firestore;

    constructor() {
        firebase.initializeApp(firebaseConfig);
        this.auth = firebase.auth();
        this.db = firebase.firestore();
    }

    public login = (email: string, password: string) => {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    public logout = () => {
        return this.auth.signOut();
    }

    public register = async (name: string, email: string, password: string) => {
        await this.auth.createUserWithEmailAndPassword(email, password);
        return this.auth.currentUser?.updateProfile({
            displayName: name
        });
    }

    public onAuthStateChange = (setUserCallback: any) => {
        return this.auth.onAuthStateChanged(user => {
            if(user) {
                setUserCallback({isLoggedIn: true, name: (this.auth.currentUser && this.auth.currentUser.displayName)});
            } else {
                setUserCallback({isLoggedIn: false, name: ''});
            }
        })
    }

    public getDb() {
        return this.db;
    }
}

export default new FirebaseService();