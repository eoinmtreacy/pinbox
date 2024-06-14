import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Tailwind CSS should be included in this file
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create root and render the main App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Measure performance in your app, optional
reportWebVitals();