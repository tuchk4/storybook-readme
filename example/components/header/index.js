import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Header = styled.h1`
  color: ${props => (props.alert ? 'red' : 'black')};
  border-bottom: ${props => (props.important ? '2px solid #cc0000' : 'none')};
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'none')};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
`;

Header.propTypes = {
  important: PropTypes.bool,
  alert: PropTypes.bool,
};

Header.defaultProps = {
  important: false,
  alert: false,
};

export default Header;
