import { useState, useEffect } from 'react';
import axios from 'axios';

function UserSearch() {
  const [userCount, setUserCount] = useState(5);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `https://randomuser.me/api?results=${userCount}`;
        const response = await axios.get(url);
        setUsers(response.data.results);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [userCount]); // Re-fetch when userCount changes

  const handleCountChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setUserCount(Math.min(50, Math.max(1, value))); // Clamp between 1-50
  };

  return (
    <div className="user-search">
      <h2>Random User Generator</h2>
      <div className="controls">
        <label htmlFor="userCount">Number of users (1-50): </label>
        <input
          id="userCount"
          type="number"
          min="1"
          max="50"
          value={userCount}
          onChange={handleCountChange}
        />
      </div>

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">Error: {error}</div>}

      {!loading && !error && (
        <table className="user-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.login.uuid}>
                <td>{index + 1}</td>
                <td>{`${user.name.first} ${user.name.last}`}</td>
                <td>{user.email}</td>
                <td>{user.location.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserSearch;