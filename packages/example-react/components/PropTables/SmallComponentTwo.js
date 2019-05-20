import React from 'react';
import PropTypes from 'prop-types';

export const SmallComponentTwo = ({ type, color }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid black',
        width: '200px',
        height: '50px',
        color,
      }}
    >
      {type}
    </div>
  );
};

SmallComponentTwo.defaultProps = {
  type: 'Small Component Two',
  color: 'blue',
};

SmallComponentTwo.propTypes = {
  /**
   * Type of the component(small two)
   */
  type: PropTypes.string.isRequired,

  /**
   * Color of the component
   */
  color: PropTypes.string.isRequired,
};
