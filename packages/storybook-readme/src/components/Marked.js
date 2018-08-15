import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';

import highlight from '../services/highlite';

export default class Marked extends React.Component {
  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);

    highlight(el, {
      withJSX: true,
    });
  }

  componentDidUpdate() {
    const el = ReactDOM.findDOMNode(this);

    highlight(el, {
      withJSX: true,
    });
  }

  render() {
    const { md } = this.props;

    return (
      <div
        className={'markdown-body'}
        dangerouslySetInnerHTML={{ __html: marked(md) }}
      />
    );
  }
}
