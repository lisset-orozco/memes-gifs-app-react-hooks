import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import env from "../environment";

// Initialize Firebase
let firebaseConfig = {
  apiKey: env.apiKey,
  authDomain: env.authDomain,
  databaseURL: env.databaseURL,
  projectId: env.projectId,
  storageBucket: env.storageBucket,
  messagingSenderId: env.messagingSenderId,
  appId: env.appId
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
export function logOut() {
  firebase.auth().signOut();
  localStorage.removeItem("user");
}

export default firebase;
