import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import Remarkable from 'react-remarkable';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

/**
 * Code/Approach that is commented - is better than highlight code
 * at componentDidMount.
 *
 * But somthing wrong with highlighting - does not hihglite jsx code blocks.
 */


// const REMARKABLE_OPTIONS = {
//   highlight: (str, lang) => {
//     if (lang && hljs.getLanguage(lang)) {
//      try {
//        console.log(str, hljs.highlight(lang, str).value);
//        return hljs.highlight(lang, str).value;
//      } catch (err) {}
//     }
//
//     try {
//       return hljs.highlightAuto(str).value;
//     } catch (err) {}
//
//     return ''; // use external default escaping
//   }
// }

// const Markdown = (props) => {
//   return <Remarkable source={props.source} options={REMARKABLE_OPTIONS} />;
// };
//
// Markdown.propTypes = {
//   source: PropTypes.string
// };

export default class Markdown extends React.Component {
  static propTypes = {
    source: PropTypes.string
  };

  componentDidMount() {
    const domNode = ReactDOM.findDOMNode(this);
    const nodes = domNode.querySelectorAll('pre code');

    if (nodes.length > 0) {
      for (var i = 0; i < nodes.length; i=i+1) {
        hljs.highlightBlock(nodes[i]);
      }
    }
  }

  render() {
    return <Remarkable source={this.props.source}/>;
  }
};
