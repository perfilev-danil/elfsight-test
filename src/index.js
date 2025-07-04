import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { DataProvider } from './components';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <React.StrictMode>
      <DataProvider>
        <App />
      </DataProvider>
    </React.StrictMode>
  </Router>
);
