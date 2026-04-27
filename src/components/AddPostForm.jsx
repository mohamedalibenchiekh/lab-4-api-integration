import { useState } from 'react';
import axios from 'axios';

function AddPostForm() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const res = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        title,
        body,
        userId: 1
      });
      
      setResponse(res.data);
      setTitle('');
      setBody('');
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="add-post-form">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter post title"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            placeholder="Enter post body"
            rows="4"
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Post'}
        </button>
      </form>

      {error && <div className="error">Error: {error}</div>}
      
      {response && (
        <div className="success-message">
          <h3>Post created successfully!</h3>
          <p>Post ID: {response.id}</p>
          <p>Title: {response.title}</p>
          <p>Body: {response.body}</p>
        </div>
      )}
    </div>
  );
}

export default AddPostForm;