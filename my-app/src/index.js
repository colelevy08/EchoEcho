import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import path from 'path-browserify';


const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// // Server code (example using Express.js)
// const express = require('express');
// const app = express();

// // Set CORS headers
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   next();
// });

// // Define your route
// app.get('/users', (req, res) => {
//   // Handle the request
// });

// // Start the server
// app.listen(5555, () => {
//   console.log('Server is running on http://localhost:5555');
// });

// // Import required modules
// const zlib = require('browserify-zlib');
// const querystring = require('querystring-es3');
// // const path = require('path-browserify');
// const crypto = require('crypto-browserify');
// const http = require('stream-http');
// const net = require('net-browserify');
// const stream = require('stream-browserify');

// Add fallbacks for missing modules
// require.resolve = (moduleName) => {
//   if (moduleName === 'zlib') return zlib;
//   if (moduleName === 'querystring') return querystring;
//   if (moduleName === 'path') return path;
//   if (moduleName === 'crypto') return crypto;
//   if (moduleName === 'http') return http;
//   if (moduleName === 'net') return net;
//   if (moduleName === 'stream') return stream;
// };

// Your existing code goes here...

// Start the server or perform any other actions using the required modules

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
