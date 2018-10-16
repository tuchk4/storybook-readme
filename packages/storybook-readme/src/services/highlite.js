import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import '../styles/prism-theme-css';

export default (dom, { withJSX = false } = {}) => {
  /**
   * should check dom.hasOwnProperty('querySelectorAll')
   * for SSR cases
   * The most common case is using this addon with storyshoots
   * https://github.com/tuchk4/storybook-readme/issues/52
   */
  const nodes =
    typeof dom.querySelectorAll === 'function'
      ? dom.querySelectorAll('pre code')
      : [];

  // console.log(nodes);

  if (nodes.length > 0) {
    for (var i = 0; i < nodes.length; i = i + 1) {
      if (withJSX) {
        if (nodes[i].classList.contains('language-js')) {
          nodes[i].classList.remove('language-js');
          nodes[i].classList.add('language-jsx');
        }
      }

      Prism.highlightElement(nodes[i]);
    }
  }
};
