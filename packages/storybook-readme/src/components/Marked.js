import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';

import highlight from '../services/highlite';

export default class Marked extends React.Component {
  ref = null;

  componentDidUpdate() {
    if (this.ref) {
      highlight(el, {
        withJSX: true,
      });
    }
  }

  handleRef = ref => {
    this.ref = ref;

    if (this.ref) {
      highlight(this.ref, {
        withJSX: true,
      });
    }
  };

  render() {
    const { md } = this.props;

    return (
      <div
        ref={this.handleRef}
        className={'markdown-body'}
        dangerouslySetInnerHTML={{ __html: marked(md) }}
      />
    );
  }
}
