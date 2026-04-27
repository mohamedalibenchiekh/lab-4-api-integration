import { useState, useEffect } from 'react';
import axios from 'axios';

function CommitHistory() {
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Transform function
  const transformCommit = (commit) => ({
    id: commit.sha ? commit.sha.substring(0, 7) : 'unknown',
    author: commit.author?.login || commit.commit?.author?.name || 'unknown',
    message: commit.commit?.message 
      ? commit.commit.message.split('\n')[0] 
      : 'No message',
    date: commit.commit?.author?.date 
      ? new Date(commit.commit.author.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      : 'Unknown date',
    url: commit.html_url || '#'
  });

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          'https://api.github.com/repos/facebook/react/commits?per_page=5'
        );
        
        const transformed = res.data.map(transformCommit);
        setCommits(transformed);
      } catch (err) {
        setError('Failed to fetch commits: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCommits();
  }, []);

  if (loading) return <div className="loading">Loading commit history...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="commit-history">
      <h2>React Repository - Recent Commits</h2>
      <div className="commits-list">
        {commits.map((commit) => (
          <div key={commit.id} className="commit-card">
            <div className="commit-header">
              <span className="commit-id">{commit.id}</span>
              <span className="commit-date">{commit.date}</span>
            </div>
            <p className="commit-message">{commit.message}</p>
            <div className="commit-footer">
              <span className="commit-author">by {commit.author}</span>
              <a 
                href={commit.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="commit-link"
              >
                View on GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommitHistory;