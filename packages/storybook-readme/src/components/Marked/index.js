import React from 'react';
import ReactDOM from 'react-dom';

import marked from '../../services/marked';
import highlight from '../../services/highlite';
import transformEmojis from '../../services/transformEmojis';

export default class Marked extends React.Component {
  ref = null;

  componentDidUpdate() {
    if (this.ref) {
      highlight(this.ref);
    }
  }

  handleRef = ref => {
    this.ref = ref;

    if (this.ref) {
      highlight(this.ref);
    }
  };

  render() {
    const { md } = this.props;

    return (
      <div
        ref={this.handleRef}
        className={'markdown-body'}
        dangerouslySetInnerHTML={{ __html: marked(transformEmojis(md)) }}
      />
    );
  }
}
