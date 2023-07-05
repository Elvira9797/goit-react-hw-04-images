import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, StyledModal } from './Modal.styled';
import { AnimatePresence } from 'framer-motion';

const Modal = ({ closeModal, children }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [closeModal]);

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const modalRoot = document.querySelector('#modal-root');

  return createPortal(
    <AnimatePresence>
      <Overlay
        onClick={handleBackdropClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <StyledModal
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </StyledModal>
      </Overlay>
    </AnimatePresence>,
    modalRoot
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
