import { useState } from 'react';
import axios from 'axios';

function GitHubUserLookup() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(null);
    setUser(null);

    try {
      const res = await axios.get(`https://api.github.com/users/${username}`);
      if (res.status === 200) {
        setUser(res.data);
      }
    } catch (err) {
      if (err.response) {
        // Server responded with error status
        if (err.response.status === 404) {
          setError('User not found');
        } else if (err.response.status === 403) {
          setError('Rate limited. Try again later.');
        } else {
          setError(`HTTP Error: ${err.response.status}`);
        }
      } else if (err.request) {
        // Request made but no response
        setError('Network error. Check your connection.');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="github-lookup">
      <h2>GitHub User Lookup</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">GitHub Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g., torvalds"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {user && (
        <div className="user-card">
          <img src={user.avatar_url} alt={`${user.login}'s avatar`} className="avatar" />
          <h3>{user.name || user.login}</h3>
          <p className="bio">{user.bio || 'No bio available'}</p>
          <div className="stats">
            <div className="stat">
              <span className="stat-number">{user.public_repos}</span>
              <span className="stat-label">Repos</span>
            </div>
            <div className="stat">
              <span className="stat-number">{user.followers}</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat">
              <span className="stat-number">{user.following}</span>
              <span className="stat-label">Following</span>
            </div>
          </div>
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">
            View Profile on GitHub
          </a>
        </div>
      )}
    </div>
  );
}

export default GitHubUserLookup;