import React from 'react';
import './TextToggle.styles.scss';
import {TickIcon} from './TextToggle.styles';
import { motion } from 'framer-motion';

const TextToggle = (props) => {

  const { state, textOff, textOn } = props;

  return (
    <motion.button 
      layout
      transition={{ duration: 0.1 }}
      className="text-toggle" 
      {...props}>
      { state ? <TickIcon /> : null }
      <span>{state ? textOn : textOff}</span>
    </motion.button>
  );
}

export default TextToggle;