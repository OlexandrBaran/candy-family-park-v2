import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';


firebase.initializeApp({
  apiKey: "AIzaSyDP_WxVlek-j6LBgIoFaoQ7IHwm0ZMO4Hg",
  authDomain: "candy-family-park.firebaseapp.com",
  projectId: "candy-family-park",
  storageBucket: "candy-family-park.appspot.com",
  messagingSenderId: "1061786890892",
  appId: "1:1061786890892:web:0eb93063d0e600d18c01a9"
});

const root = ReactDOM.createRoot(document.getElementById('root'));

export const Context = createContext(null)

const firestore = firebase.firestore();

root.render(
  <Context.Provider value={{
    firebase,
    firestore
  }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>
);

