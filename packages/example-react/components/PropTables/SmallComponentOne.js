import React from 'react';
import PropTypes from 'prop-types';

export const SmallComponentOne = ({ type }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid black',
        width: '200px',
        height: '50px',
      }}
    >
      {type}
    </div>
  );
};

SmallComponentOne.defaultProps = {
  type: 'Small Component One',
};

SmallComponentOne.propTypes = {
  /**
   * Type of the component(small one)
   */
  type: PropTypes.string.isRequired,
};
