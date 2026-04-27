import { useState, useEffect } from 'react';
import axios from 'axios';

function AdvancedSearch() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);
  const limit = 10;

  const totalPages = Math.ceil(totalResults / limit);

  useEffect(() => {
    if (!query.trim()) {
      setPosts([]);
      setTotalResults(0);
      return;
    }

    const controller = new AbortController();

    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        // First, get all posts and filter them client-side
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          signal: controller.signal,
          params: {
            _page: page,
            _limit: limit,
            title_like: query
          }
        });

        // Get total count from headers or fallback
        const total = parseInt(res.headers['x-total-count']) || 0;
        setTotalResults(total);
        setPosts(res.data);
      } catch (err) {
        if (err.name !== 'CanceledError') {
          setError('Search failed: ' + err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    return () => controller.abort();
  }, [query, page]);

  // Reset page when query changes
  useEffect(() => {
    setPage(1);
  }, [query]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="advanced-search">
      <h2>Advanced Search with Pagination</h2>
      
      <div className="search-form">
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Search posts by title..."
          className="search-input"
        />
      </div>

      {loading && <div className="loading">Searching...</div>}
      {error && <div className="error">{error}</div>}

      {query && !loading && (
        <div className="results-info">
          <p>{totalResults} results found for "{query}"</p>
        </div>
      )}

      {posts.length > 0 && (
        <>
          <div className="search-results">
            {posts.map(post => (
              <div key={post.id} className="result-card">
                <span className="post-number">#{post.id}</span>
                <h3>{post.title}</h3>
                <p>{post.body.substring(0, 100)}...</p>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination-controls">
              <button
                onClick={() => setPage(p => p - 1)}
                disabled={page === 1}
              >
                Previous
              </button>
              
              <span className="page-info">
                Page {page} of {totalPages}
              </span>
              
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {query && !loading && posts.length === 0 && (
        <div className="no-results">
          <p>No posts found matching your search.</p>
        </div>
      )}
    </div>
  );
}

export default AdvancedSearch;