import React from 'react';
import Markdown from './markdown';
import './github-markdown-css';

const ReadmeContainer = ({ markdown, style }) => {
  const md = Array.isArray(markdown) ? markdown : [markdown];

  return (
    <div className="markdown-body" style={style}>
      {md.map((source, index) => <Markdown source={source} key={index} />)}
    </div>
  );
};

export default ReadmeContainer;
