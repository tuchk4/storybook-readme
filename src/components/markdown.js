import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import Remarkable from 'react-remarkable';
import hljs from 'highlight.js';
import './highlight-github-css';

const highlight = (instance) => {
  const domNode = ReactDOM.findDOMNode(instance);
  const nodes = domNode.querySelectorAll('pre code');

  if (nodes.length > 0) {
    for (var i = 0; i < nodes.length; i=i+1) {
      hljs.highlightBlock(nodes[i]);
    }
  }
};

export default class Markdown extends React.Component {
  static propTypes = {
    source: PropTypes.string
  };

  componentDidMount() {
    highlight(this);
  }

  componentDidUpdate() {
    highlight(this);
  }

  render() {
    return <Remarkable source={this.props.source}/>;
  }
};
