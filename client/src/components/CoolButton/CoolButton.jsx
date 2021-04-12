import React from 'react';
import './CoolButton.styles.scss';

const CoolButton = (props) => {
  const {text} = props;

  return (
    <button className="cool-button" {...props}>
      {text}
    </button>
  );
}

export default CoolButton;