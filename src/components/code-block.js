import React, { PropTypes } from 'react';
import Highlight from 'react-highlight';
import 'highlight.js/styles/github.css';

export default class CodeBlock extends React.Component {
  static propTypes = {
    literal: PropTypes.string,
    language: PropTypes.string
  };

  render() {
    return (
      <Highlight className={this.props.language}>
        {this.props.literal}
      </Highlight>
    );
  }
}
