import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users'); // Adjust URL if needed
        setUsers(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>User List</h2>
      {users.length === 0 ? (
        <p>No users found. Add some users!</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              {user.name} ({user.email}) - {user.team || 'N/A'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
