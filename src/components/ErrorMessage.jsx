function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message">
      <div className="error-icon">⚠️</div>
      <p>{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="retry-btn">
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;