import React from 'react';
import PropTypes from 'prop-types';

export const withHOC = options => WrappedComponent => {
  const Enhanced = props => {
    return <WrappedComponent {...props} />;
  };
  Enhanced.defaultProps = {
    name: 'Enhanced Component',
    whatever: 'Whatever string here',
  };
  Enhanced.propTypes = {
    /**
     * Name of this Component
     */
    name: PropTypes.string.isRequired,

    /**
     * Whatever string here
     */
    whatever: PropTypes.string.isRequired,
  };

  return Enhanced;
};
