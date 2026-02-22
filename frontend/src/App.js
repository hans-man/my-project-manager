import React from 'react';
import UserList from './components/UserList'; // Import UserList
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Project Manager</h1>
        <UserList /> {/* Render UserList component */}
      </header>
    </div>
  );
}

export default App;
