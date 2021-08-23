import React, { createContext } from "react";
import firebaseApp from "firebase/app";

export const FirebaseContext = createContext(null);

export default ({ children }) => {
  if (!firebaseApp.apps.length) {
    firebaseApp.initializeApp({
      apiKey: "AIzaSyB4qcDGbozDY7o1O8emy_MX_mvLn08IclE",
  authDomain: "todo-6c702.firebaseapp.com",
  databaseURL: "https://todo-6c702-default-rtdb.firebaseio.com",
  projectId: "todo-6c702",
  storageBucket: "todo-6c702.appspot.com",
  messagingSenderId: "683011623158",
  appId: "1:683011623158:web:eca84d9c0d85ea431984d7",
  measurementId: "G-HZJPZ6HH6B"
    });
  }
  return (
    <FirebaseContext.Provider value={firebaseApp}>
      {children}
    </FirebaseContext.Provider>
  );
};
