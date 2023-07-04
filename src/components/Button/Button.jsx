import React from 'react';
import PropTypes from 'prop-types';
import { StyledButton } from './Button.styled';

const Button = ({ loadMore, children, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <StyledButton type="button" disabled>
          Loading...
        </StyledButton>
      ) : (
        <StyledButton type="button" onClick={() => loadMore()}>
          {children}
        </StyledButton>
      )}
    </>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Button;
