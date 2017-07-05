import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Remarkable from 'react-remarkable';
import './prism';
import './prism.theme';

const highlight = instance => {
  const domNode = ReactDOM.findDOMNode(instance);
  const nodes = domNode.querySelectorAll('pre code');

  if (nodes.length > 0) {
    for (var i = 0; i < nodes.length; i = i + 1) {
      console.log(nodes[i].classList);
      if (nodes[i].classList.contains('language-js')) {
        nodes[i].classList.remove('language-js');
        nodes[i].classList.add('language-jsx');
      }

      Prism.highlightElement(nodes[i]);
    }
  }
};

export default class Markdown extends React.Component {
  static propTypes = {
    source: PropTypes.string,
  };

  componentDidMount() {
    highlight(this);
  }

  componentDidUpdate() {
    highlight(this);
  }

  render() {
    return <Remarkable source={this.props.source} />;
  }
}
