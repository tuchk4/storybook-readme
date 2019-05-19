import React from 'react';
import PropTypes from 'prop-types';

export const SmallComponentThree = ({ type, backgroundColor }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid black',
        width: '200px',
        height: '50px',
        backgroundColor,
      }}
    >
      {type}
    </div>
  );
};

SmallComponentThree.defaultProps = {
  type: 'Small Component Three',
  backgroundColor: 'black',
};

SmallComponentThree.propTypes = {
  /**
   * Type of the component(small three)
   */
  type: PropTypes.string.isRequired,

  /**
   * Background color of the component
   */
  backgroundColor: PropTypes.string.isRequired,
};
