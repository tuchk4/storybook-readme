import React, { PropTypes } from 'react';
import Button from '../button';

const getBackground = ({ info, alert, important }) => {
  if (info) {
    return 'blue';
  } else if (alert) {
    return 'red';
  } else if (important) {
    return 'yellow';
  }
};

const ColoredButton = ({
  info,
  alert,
  important,
  ...props
}) => {
  const style = {
    background: getBackground({ info, alert, important })
  };

  return <Button style={style} {...props}/>
};

ColoredButton.propTypes = {
  info: PropTypes.bool,
  alert: PropTypes.bool,
  important: PropTypes.bool,
  ...Button.propTypes
};

export default ColoredButton;
