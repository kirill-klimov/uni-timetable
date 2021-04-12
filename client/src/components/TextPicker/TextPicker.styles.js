import { motion } from 'framer-motion';
import styled from 'styled-components';

export const TextPickerOptions = styled.div`
  position: relative;
`;

export const PickerHighlight = styled(motion.div)`
  position: absolute;
  height: 100%;
  background-color: var(--accent);
  width: ${ ({selectionWidth, initialWidth}) => selectionWidth || initialWidth }px;
  left: ${ ({selectionOffset}) => selectionOffset || 0 }px;
`;