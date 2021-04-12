import React from 'react';
import './TextInput.styles.scss';

const TextInput = (props) => {
  return (
    <input 
    className="my-text-input"
    type={props.type || "text"} 
    spellCheck="false"
    {...props} />
  );
}

export default TextInput;