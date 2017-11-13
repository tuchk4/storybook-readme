import React from 'react';
import PropTypes from 'prop-types';
import rockey from 'rockey-react';

const StyledButton = rockey.button`
  padding: 5px;
  font-size: 15px;
  margin: 1px;
  border: 2px solid black;
  border-radius: 3px;

  color: ${props => {
    if (props.alert || props.success) return 'white';

    return 'black';
  }};

  background: ${props => {
    if (props.alert) return 'red';
    if (props.success) return 'green';

    return 'white';
  }};
`;

const Button = ({ label, ...props }) => {
  return <StyledButton {...props}>{label}</StyledButton>;
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  alert: PropTypes.bool,
  success: PropTypes.bool,
};

export default Button;
