import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Initialize Firebase
let firebaseConfig = {
  apiKey: "AIzaSyCnumJ0qxAqjJya0O2bI-OYWX7Tg4HIH1k",
  authDomain: "memes-react.firebaseapp.com",
  databaseURL: "https://memes-react.firebaseio.com",
  projectId: "memes-react",
  storageBucket: "",
  messagingSenderId: "1006927157652",
  appId: "1:1006927157652:web:94570f71231155cb"
};
firebase.initializeApp(firebaseConfig);

// FIREBASE INITIALIZE AND REFS
let firestore = firebase.firestore();
export let memesRef = firestore.collection("memes");

//FIREBASE AUX FUNCTIONS
export function writeMeme(object) {
  let id = memesRef.doc().id;
  memesRef.doc(id).set(object);
}

//FIREBASE LOGIN
export function gmailLogin() {
  var provider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      // user = result.user;
      // setUser();
      let userText = JSON.stringify(result.user);

      localStorage.setItem("user", userText);
      return result.user;
    });
}

//FIREBASE SignOut
export function signOut() {
  localStorage.removeItem("user");
  firebase.auth.signOut();
}

//FIREBASE LogOut
export let logOut = () => {
  firebase.auth().signOut();
  localStorage.removeItem("user");
};

export default firebase;
