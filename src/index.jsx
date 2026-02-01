import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeDatadog } from './config/datadog';

// Handle SPA redirects from GitHub Pages 404 fallback
const redirectPath = sessionStorage.getItem('redirect');
if (redirectPath) {
  sessionStorage.removeItem('redirect');
  window.history.replaceState(null, '', redirectPath);
}

// Initialize Datadog monitoring
initializeDatadog();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
