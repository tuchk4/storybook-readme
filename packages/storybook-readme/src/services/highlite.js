// import Prism from 'prismjs';
// import 'prismjs/components/prism-jsx';
// import 'prismjs/components/prism-typescript';

import hljs from 'highlight.js';
import { README_CODE_CLASS } from '../const';

hljs.configure({
  skip: true,
});

export default dom => {
  /**
   * should check dom.hasOwnProperty('querySelectorAll')
   * for SSR cases
   * The most common case is using this addon with storyshoots
   * https://github.com/tuchk4/storybook-readme/issues/52
   */
  const nodes =
    typeof dom.querySelectorAll === 'function'
      ? dom.querySelectorAll(`pre code[class~="${README_CODE_CLASS}"]`)
      : [];

  if (nodes.length > 0) {
    for (var i = 0; i < nodes.length; i = i + 1) {
      hljs.highlightBlock(nodes[i]);
    }
  }
};
