import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// Global cache shared across all components
const globalCache = new Map();

function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    if (!url) return;

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();

    const fetchData = async () => {
      // Check cache first
      const cachedData = globalCache.get(url);
      if (cachedData && !options.skipCache) {
        console.log('useFetch: Cache hit for', url);
        setData(cachedData);
        setLoading(false);
        return;
      }

      console.log('useFetch: Fetching', url);
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(url, {
          signal: abortControllerRef.current.signal,
          ...options.axiosConfig
        });

        // Store in cache if successful
        if (!options.noCache) {
          globalCache.set(url, res.data);
        }

        setData(res.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request cancelled:', url);
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [url, options.skipCache]);

  return { data, loading, error };
}

export default useFetch;