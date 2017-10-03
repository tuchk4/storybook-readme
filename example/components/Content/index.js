import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  background: ${props => (props.error ? 'red' : '#f8f8f8')};
  color: ${props => (props.error ? 'white' : 'black')};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
`;

const Content = ({ loading, children, error, ...props }) => {
  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return <Container error={true}>{error}</Container>;
  }

  return <Container>{children}</Container>;
};

Content.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default Content;
