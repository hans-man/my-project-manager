import React, { useState } from 'react';
import axios from 'axios';

const AddUserForm = ({ onUserAdded }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [team, setTeam] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages

    if (!name || !email) {
      setMessage('Name and Email are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users', { name, email, team });
      console.log('User added:', response.data);
      setMessage('User added successfully!');
      setName('');
      setEmail('');
      setTeam('');
      if (onUserAdded) {
        onUserAdded(); // Notify parent to refresh user list
      }
    } catch (error) {
      console.error('Error adding user:', error.response ? error.response.data : error.message);
      setMessage(`Error: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  return (
    <div>
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Team:</label>
          <input
            type="text"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
          />
        </div>
        <button type="submit">Add User</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddUserForm;
