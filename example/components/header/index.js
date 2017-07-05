import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ alert, important, children }) => {
  const style = {};

  if (alert) {
    style.color = 'red';
  }

  return (
    <h1 style={style}>
      {children}
      {important ? '!' : ''}
    </h1>
  );
};

Header.propTypes = {
  important: PropTypes.bool,
  alert: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Header.defaultProps = {
  important: false,
  alert: false,
};

export default Header;
