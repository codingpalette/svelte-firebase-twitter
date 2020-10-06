import * as firebase from "firebase/app";

const firebaseConfig = {
    apiKey: __myapp.env.API_KEY,
    authDomain:  __myapp.env.AUTHDOMAIN,
    databaseURL:  __myapp.env.DATABASEURL,
    projectId:  __myapp.env.PROJECTID,
    storageBucket:  __myapp.env.STORAGEBUCKET,
    messagingSenderId:  __myapp.env.MESSAGINGSENDERID,
    appId:  __myapp.env.APPID,
};

export default firebase.initializeApp(firebaseConfig);