import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.tsx';
import AuthContextProvider from './context/AuthContext.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <GoogleOAuthProvider clientId='228097325596-si80lhvch9q4g7gmqj5e7cvrilca63p5.apps.googleusercontent.com'>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
