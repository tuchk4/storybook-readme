import React, { PropTypes } from 'react';

const Button = ({
  onClick,
  label
}) => {
  return <button onClick={onClick}>{label}</button>;
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Button;
