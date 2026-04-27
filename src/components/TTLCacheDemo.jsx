import { useState, useEffect } from 'react';
import axios from 'axios';
import { cacheManager } from '../utils/cacheManager';

function TTLCacheDemo() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cacheInfo, setCacheInfo] = useState('');
  const [cacheAge, setCacheAge] = useState(0);

  const postsUrl = 'https://jsonplaceholder.typicode.com/posts/1';
  const ttl = 10000; // 10 seconds for demo purposes

  const fetchData = async (skipCache = false) => {
    setLoading(true);
    setError(null);

    // Check cache first (unless skipCache is true)
    if (!skipCache) {
      const cachedData = cacheManager.get(postsUrl);
      if (cachedData) {
        setData(cachedData);
        setCacheInfo('Data loaded from cache');
        const age = Date.now() - cacheManager.cache.get(postsUrl).timestamp;
        setCacheAge(Math.floor(age / 1000));
        setLoading(false);
        return;
      }
    }

    try {
      setCacheInfo('Fetching from API...');
      const res = await axios.get(postsUrl);
      setData(res.data);
      
      // Store in cache with TTL
      cacheManager.set(postsUrl, res.data, ttl);
      setCacheInfo('Data fetched and cached');
      setCacheAge(0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateAge = () => {
    const cachedItem = cacheManager.cache.get(postsUrl);
    if (cachedItem) {
      setCacheAge(Math.floor((Date.now() - cachedItem.timestamp) / 1000));
    }
  };

  // Update cache age display every second
  useEffect(() => {
    const interval = setInterval(updateAge, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ttl-cache-demo">
      <h2>Cache TTL Demo (10 seconds TTL)</h2>
      
      <div className="cache-controls">
        <button onClick={() => fetchData(false)} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Data (Use Cache)'}
        </button>
        <button onClick={() => fetchData(true)} disabled={loading}>
          Force Refetch (Bypass Cache)
        </button>
        <button onClick={() => cacheManager.clear()}>
          Clear Cache
        </button>
      </div>

      <div className="cache-info">
        <p>Status: {cacheInfo}</p>
        <p>Cache Age: {cacheAge} seconds</p>
        <p>TTL: {ttl / 1000} seconds</p>
        <p>Cache Status: {cacheManager.has(postsUrl) ? 'Valid' : 'Expired/Empty'}</p>
      </div>

      {error && <div className="error">{error}</div>}

      {data && (
        <div className="post-data">
          <h3>Post Data:</h3>
          <p><strong>ID:</strong> {data.id}</p>
          <p><strong>Title:</strong> {data.title}</p>
          <p><strong>Body:</strong> {data.body}</p>
        </div>
      )}
    </div>
  );
}

export default TTLCacheDemo;