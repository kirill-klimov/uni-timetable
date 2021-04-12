import React, { useRef } from 'react';
import './TextPicker.styles.scss';
import {PickerHighlight, TextPickerOptions} from './TextPicker.styles';

const TextPicker = ({ state, options, setActive, initialWidth, label }) => {

  const optionsRefs = useRef([]);

  const addToArrayRef = (el) => {
    if (el && !optionsRefs.current.includes(el)) {
      optionsRefs.current.push(el);
    }
  }

  const selectionOffset = optionsRefs.current.map(item => item.offsetWidth).reduce((acc, curr, index) => {
    if (index >= state) return acc;
    return acc += curr;
  }, 0);

  const selectionWidth = optionsRefs.current[state] && optionsRefs.current[state].offsetWidth;

  return (
    <div className="text-picker">
      <span className="text-picker__label">{label}</span>
      <TextPickerOptions
        className="text-picker__options">
        <PickerHighlight
          layout
          transition={{type: "spring", duration: 0.25}}
          initialWidth={initialWidth}
          selectionOffset={selectionOffset}
          selectionWidth={selectionWidth} />
        {
          options.map((item, index) => 
            <button
              ref={addToArrayRef}
              key={index}
              onClick={() => setActive(index)}
              className={`options__item ${index === state ? "active" : ""}`}>{item}</button>)
        }
      </TextPickerOptions>
    </div>
  );
}

export default TextPicker;