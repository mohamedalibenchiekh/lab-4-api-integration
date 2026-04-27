import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function CancelableDataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(false);

  const fetchData = useCallback(() => {
    setShouldFetch(true);
  }, []);

  useEffect(() => {
    if (!shouldFetch) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const getData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Using axios with cancel token
        const source = axios.CancelToken.source();
        
        const res = await axios.get('https://jsonplaceholder.typicode.com/users', {
          cancelToken: source.token,
          signal: signal
        });

        if (!signal.aborted) {
          setData(res.data);
        }
      } catch (err) {
        if (axios.isCancel(err) || err.name === 'AbortError' || err.name === 'CanceledError') {
          console.log('Request cancelled');
        } else {
          setError(err.message);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    getData();

    // Cleanup function
    return () => {
      controller.abort();
    };
  }, [shouldFetch]);

  return (
    <div className="cancelable-fetcher">
      <h2>Cancelable Data Fetching Demo</h2>
      
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Fetching...' : 'Fetch Users'}
      </button>
      
      {loading && (
        <div className="loading">
          <p>Fetching data... (try navigating away quickly)</p>
          <button onClick={() => setShouldFetch(false)}>
            Cancel Request
          </button>
        </div>
      )}
      
      {error && <div className="error">{error}</div>}
      
      {data && (
        <div className="users-list">
          <h3>Fetched Users</h3>
          <ul>
            {data.map(user => (
              <li key={user.id}>{user.name} - {user.email}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CancelableDataFetcher;