import { useState, useEffect } from 'react';
import axios from 'axios';

function BookSearch() {
  const [books, setBooks] = useState([]);
  const [validBooks, setValidBooks] = useState([]);
  const [invalidCount, setInvalidCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Validation function
  const isValidBook = (book) => {
    return book.title && 
           book.author_name && 
           book.author_name.length > 0 && 
           book.first_publish_year;
  };

  const transformBook = (book) => {
    return {
      title: book.title,
      author: Array.isArray(book.author_name) 
        ? book.author_name.join(', ') 
        : book.author_name,
      year: book.first_publish_year,
      isbn: book.isbn ? book.isbn[0] : 'N/A',
      subjects: book.subject ? book.subject.slice(0, 3) : []
    };
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const res = await axios.get('https://openlibrary.org/search.json?title=The+Great+Gatsby');
        
        if (res.data && res.data.docs) {
          const allBooks = res.data.docs;
          setBooks(allBooks);
          
          const filtered = allBooks.filter(isValidBook);
          setValidBooks(filtered.map(transformBook));
          setInvalidCount(allBooks.length - filtered.length);
        } else {
          throw new Error('Invalid API response structure');
        }
      } catch (err) {
        setError('Failed to fetch or validate book data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <div className="loading">Loading books...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="book-search">
      <h2>Book Search - "The Great Gatsby"</h2>
      
      {invalidCount > 0 && (
        <div className="warning">
          <p>{invalidCount} books were filtered out due to missing data</p>
        </div>
      )}
      
      <div className="book-count">
        <p>Showing {validBooks.length} valid books</p>
      </div>
      
      <div className="books-grid">
        {validBooks.map((book, index) => (
          <div key={index} className="book-card">
            <h3>{book.title}</h3>
            <p className="author">by {book.author}</p>
            <p className="year">Published: {book.year}</p>
            <p className="isbn">ISBN: {book.isbn}</p>
            {book.subjects.length > 0 && (
              <div className="subjects">
                <strong>Subjects:</strong>
                <ul>
                  {book.subjects.map((subject, i) => (
                    <li key={i}>{subject}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookSearch;