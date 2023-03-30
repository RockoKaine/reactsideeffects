import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { AuthContextProvider } from './store/auth-context';

const root = ReactDOM.createRoot(document.getElementById('root'));


//  by wrapping with authContext it allows all children to have access to its goodies
// and because we are wrapping with authcontext we dont need to use fragments
// here we must also add value and set our isloggedin, otherwise the app will crash
// because we are using a provider and a default value in auth-context


root.render(<AuthContextProvider><App /></AuthContextProvider>);
