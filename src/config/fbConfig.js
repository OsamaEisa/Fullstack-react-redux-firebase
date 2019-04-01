/* /app => import just the base features of the firebase library
   to ignore the console warning saying we use the development version
   and we import everything, but we don't need everything.
*/
import firebase from 'firebase/app';
// the database actually
import 'firebase/firestore';
// authentication
import 'firebase/auth';



// Initialize Firebase
var config = {
  apiKey: "AIzaSyAlkcyA8mR7Q9snk24bsJf0ronimd6JBMM",
  authDomain: "react-redux-mario-projec-c3ca6.firebaseapp.com",
  databaseURL: "https://react-redux-mario-projec-c3ca6.firebaseio.com",
  projectId: "react-redux-mario-projec-c3ca6",
  storageBucket: "react-redux-mario-projec-c3ca6.appspot.com",
  messagingSenderId: "167628700253"
};

firebase.initializeApp(config);
firebase.firestore();

export default firebase;