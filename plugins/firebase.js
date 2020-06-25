import firebase from 'firebase'

if(!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDhjHDG4O09fbXttfn58DyAuebavyxqITY",
    authDomain: "todo-9913e.firebaseapp.com",
    databaseURL: "https://todo-9913e.firebaseio.com",
    projectId: "todo-9913e",
    storageBucket: "todo-9913e.appspot.com",
    messagingSenderId: "732162218047",
    appId: "1:732162218047:web:c1caec51192410419b408a",
    measurementId: "G-RH4VJ59BPP"
  })
  }
  export default firebase
