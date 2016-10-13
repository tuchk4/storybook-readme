import React from 'react';
import 'github-markdown-css';

const markdownContainerStyle = {
  margin: '16px'
};

const ReadmeContainer = ({
  children
}) => <div className="markdown-body" style={markdownContainerStyle}>{children}</div>;

export default ReadmeContainer;
