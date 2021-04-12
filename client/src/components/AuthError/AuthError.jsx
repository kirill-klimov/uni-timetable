import React from 'react';
import './AuthError.styles.scss';

const AuthError = ({ message }) => {
  return (
    <div className="auth-error">
      <span className="auth-error__text">{message}</span>
    </div>
  );
}

export default AuthError;