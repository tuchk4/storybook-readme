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

    case 'normal':
    default:
      return 'black';
  }
}

const StyledButton = styled.button`
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

const Button = ({ label, ...props }) => (
  <StyledButton {...props}>{label}</StyledButton>
);

class Message {}

Button.propTypes = {
  /**  Button type */
  variant: PropTypes.oneOf(['success', 'normal', 'warning', 'alert']),
  /**
   * Button label
   */
  label: PropTypes.string.isRequired,
  /**
   * You can declare that a prop is a specific JS type. By default, these
   * are all optional.
   */
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  /**
   * Anything that can be rendered: numbers, strings, elements or an array
   * (or fragment) containing these types.
   */
  optionalNode: PropTypes.node,

  /** A React element. */
  optionalElement: PropTypes.element,

  /**
   * You can also declare that a prop is an instance of a class. This uses
   * JS's instanceof operator.
   */
  optionalMessage: PropTypes.instanceOf(Message),

  /**
   * You can ensure that your prop is limited to specific values by treating
   * it as an enum
   */
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  /**  An object that could be one of many types  */
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message),
  ]),

  /**  An array of a certain type */
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  /**  An object with property values of a certain type  */
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  /** An object taking on a particular shape  */
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number,
  }),

  /**
   * You can also supply a custom validator to `arrayOf` and `objectOf`.
   * It should return an Error object if the validation fails. The validator
   * will be called for each key in the array or object. The first two
   * arguments of the validator are the array or object itself, and the
   * current item's key.
   */
  customArrayProp: PropTypes.arrayOf(function(
    propValue,
    key,
    componentName,
    location,
    propFullName
  ) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' +
          propFullName +
          '` supplied to' +
          ' `' +
          componentName +
          '`. Validation failed.'
      );
    }
  }),
};

Button.defaultProps = {
  variant: 'normal',
};

export default Button;
