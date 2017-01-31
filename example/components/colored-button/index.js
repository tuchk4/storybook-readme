import React, { PropTypes } from 'react';
import Button from '../button';

const getBackground = ({ info, alert, success }) => {
  if (info) {
    return 'blue';
  } else if (alert) {
    return 'red';
  } else if (success) {
    return 'green';
  }
};

const ColoredButton = ({
  info,
  alert,
  success,
  style,
  ...props
}) => {
  const newStyle = {
    ...style,
    color: getBackground({ info, alert, success })
  };

  return <Button style={newStyle} {...props}/>;
};

ColoredButton.propTypes = {
  info: PropTypes.bool,
  alert: PropTypes.bool,
  success: PropTypes.bool,
  ...Button.propTypes
};

export default ColoredButton;
