import React, { PropTypes } from 'react';

const Button = ({
  onClick,
  label,
  style
}) => {
  return <button style={style} onClick={onClick}>{label}</button>;
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Button;
