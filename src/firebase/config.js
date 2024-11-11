import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    
}

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = firebase.storage();
export const db = firebase.firestore();