import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyB5Ug1E8kFZB0ZTVlBxaVIsQON2GvX6Quc",
    authDomain: "fir-react-fileupload.firebaseapp.com",
    projectId: "fir-react-fileupload",
    storageBucket: "fir-react-fileupload.appspot.com",
    messagingSenderId: "13376759702",
    appId: "1:13376759702:web:1757cf307841d166ed5fb7",
    measurementId: "G-84YHFWFSTZ"
  };

  firebase.initializeApp(firebaseConfig)

  const storage = firebase.storage();

  export { storage, firebase as default };