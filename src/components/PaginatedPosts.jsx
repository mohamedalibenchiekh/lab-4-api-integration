import { useState, useEffect } from 'react';
import axios from 'axios';

function PaginatedPosts() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
        );
        
        // Get total count from headers
        const totalCount = parseInt(res.headers['x-total-count']) || 100;
        setTotalPages(Math.ceil(totalCount / limit));
        setPosts(res.data);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="paginated-posts">
      <h2>Posts (Page {page} of {totalPages})</h2>
      
      {loading ? (
        <div className="loading">Loading posts...</div>
      ) : (
        <>
          <div className="posts-list">
            {posts.map((post) => (
              <div key={post.id} className="post-card">
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <span className="post-id">Post #{post.id}</span>
              </div>
            ))}
          </div>
          
          <div className="pagination-controls">
            <button 
              onClick={() => goToPage(1)}
              disabled={page === 1}
            >
              First
            </button>
            <button 
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            
            <div className="page-numbers">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={page === pageNum ? 'active' : ''}
                  >
                    {pageNum}
                  </button>
                );
              })}
              {totalPages > 5 && page < totalPages - 2 && (
                <span>...{totalPages}</span>
              )}
            </div>
            
            <button 
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
            <button 
              onClick={() => goToPage(totalPages)}
              disabled={page === totalPages}
            >
              Last
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default PaginatedPosts;