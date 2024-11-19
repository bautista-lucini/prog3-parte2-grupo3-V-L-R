import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBIVYLHxFUWOsJ8WWOYGT51JQAAugFG27w",
  authDomain: "pi-lrv-grupo3.firebaseapp.com",
  projectId: "pi-lrv-grupo3",
  storageBucket: "pi-lrv-grupo3.firebasestorage.app",
  messagingSenderId: "748975476708",
  appId: "1:748975476708:web:52ae6db560651f8c7501f1"
}

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = firebase.storage();
export const db = firebase.firestore();