import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ErrorBoundary from './client/ErrorBoundary'; // Importing the ErrorBoundary component

// Render our App component as a child of ErrorBoundary. This means that ErrorBoundary will catch any errors
// in the component tree rooted at App.
ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);

// Reporting on runtime performance in production
reportWebVitals();
