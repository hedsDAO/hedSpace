import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';  // Assuming you have a CSS file for global styles
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// Create a root constant to manage the root element rendering
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
