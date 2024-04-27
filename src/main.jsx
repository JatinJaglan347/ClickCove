import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
import './index.css';

import Login from './components/Login/Login.jsx';
import Signup from './components/Signup/Signup.jsx';
import Home from './components/Home/Home.jsx';

import {FirebaseProvider} from './context/Firebase'
import App from './App.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FirebaseProvider>
      <App/>
    </FirebaseProvider>
  </React.StrictMode>
);

