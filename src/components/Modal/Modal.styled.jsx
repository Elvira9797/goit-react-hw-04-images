import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
`;

export const StyledModal = styled(motion.div)`
  position: absolute;
  width: 95vw;
  max-width: 720px;
  max-height: calc(100vh - 50px);
`;

export const ModalImg = styled.img`
  display: block;
  height: auto;
  max-width: 100%;
`;
