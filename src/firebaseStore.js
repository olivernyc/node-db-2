import { compose } from "redux";
import { reactReduxFirebase } from "react-redux-firebase";
import firebase from "firebase";
import { createStore } from "redux";
import rootReducer from "./reducers";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAsP8MqeQe7aRnUMg0cxq7SvqXKTNJcTeA",
  authDomain: "nycmesh-node-db.firebaseapp.com",
  databaseURL: "https://nycmesh-node-db.firebaseio.com",
  projectId: "nycmesh-node-db",
  storageBucket: "nycmesh-node-db.appspot.com",
  messagingSenderId: "855335436069",
  appId: "1:855335436069:web:26e3a74d57329ac8"
};

firebase.initializeApp(firebaseConfig);

// react-redux-firebase options
const config = {
  userProfile: "users", // firebase root where user profiles are stored
  enableLogging: false // enable/disable Firebase's database logging
};

// Add redux Firebase to compose
const createStoreWithFirebase = compose(reactReduxFirebase(firebase, config))(
  createStore
);

// Create store with reducers and initial state
export default createStoreWithFirebase(rootReducer);
