import firebase from 'firebase/app'
import 'firebase/firebase-auth'
import 'firebase/firebase-firestore'
import 'firebase/firebase-storage'

const firebaseConfig = {
    apiKey: __myapp.env.API_KEY,
    authDomain:  __myapp.env.AUTHDOMAIN,
    databaseURL:  __myapp.env.DATABASEURL,
    projectId:  __myapp.env.PROJECTID,
    storageBucket:  __myapp.env.STORAGEBUCKET,
    messagingSenderId:  __myapp.env.MESSAGINGSENDERID,
    appId:  __myapp.env.APPID,
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();
