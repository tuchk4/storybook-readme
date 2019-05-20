import React from 'react';
import PropTypes from 'prop-types';

export const WrapperComponent = ({ width, height, children }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        border: '2px solid black',
        width,
        height,
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >
      {children}
    </div>
  );
};

WrapperComponent.defaultProps = {
  width: '200px',
  height: '200px',
};

WrapperComponent.propTypes = {
  /**
   * Width of the component
   */
  width: PropTypes.string.isRequired,

  /**
   * Height of the component
   */
  height: PropTypes.string.isRequired,

  /**
   * Children's are needed
   */
  children: PropTypes.node,
};
