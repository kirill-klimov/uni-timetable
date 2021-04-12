import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message">
      <span className="error-message__text">{message || "There was an error"}</span>
      <button className="error-message__close">✕</button>
    </div>
  );
}

export default ErrorMessage;