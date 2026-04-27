import { useState, useEffect } from 'react';
import axios from 'axios';

function SlowAPIComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // This URL deliberately takes 4 seconds to respond
      const res = await axios.get('https://httpstat.us/200?sleep=4000', {
        timeout: 3000 // 3 second timeout
      });
      setData(res.data);
    } catch (err) {
      if (err.code === 'ECONNABORTED') {
        setError('Request took too long. Please try again.');
      } else if (err.message === 'Network Error') {
        setError('Network error. Check your connection.');
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  return (
    <div className="slow-api">
      <h2>Timeout Handling Demo</h2>
      
      {loading && (
        <div className="loading">
          <p>Fetching data (timeout in 3 seconds)...</p>
          <div className="progress-bar">
            <div className="progress" style={{ animation: 'timeout 3s linear' }}></div>
          </div>
        </div>
      )}
      
      {error && (
        <div className="error">
          <p>{error}</p>
          <button onClick={handleRetry}>Try Again</button>
        </div>
      )}
      
      {data && (
        <div className="success">
          <p>Data fetched successfully!</p>
          <p>Response: {JSON.stringify(data)}</p>
        </div>
      )}
    </div>
  );
}

export default SlowAPIComponent;