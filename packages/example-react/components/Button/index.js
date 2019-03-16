import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

function getBorderColor(variant) {
  switch (variant) {
    case 'alert':
      return 'red';
    case 'success':
      return 'green';
    case 'warning':
      return 'orange';
    default:
      return 'black';
  }
}

const Button = styled(({ label, ...props }) => (
  <button {...props}>{label}</button>
))`
  font-size: 16px;
  font-weight: bold;

  cursor: pointer;
  padding: 8px 12px;
  outline: none;

  border-width: 2px;
  border-style: solid;
  border-color: ${props => getBorderColor(props.variant)};

  border-radius: 8px;
  color: rgba(0, 0, 0, 0.96);

  :hover {
    background: yellow;
    border-width: 3px;

    padding: 7px 11px;
  }

  :active {
    background: yellow;
    border-width: 4px;

    padding: 6px 10px;
  }
`;

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'alert']),
};

export default withTheme(Button);
