import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Determine backend URL based on environment
    const backendUrl = process.env.NODE_ENV === 'production'
      ? window.location.origin // In production, assume backend is on same origin
      : 'http://localhost:5000'; // In development, backend runs on port 5000

    axios.get(backendUrl)
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error('Error fetching data from backend:', error);
        setMessage('Failed to connect to backend.');
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{message}</p> {/* Display the message from backend */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
