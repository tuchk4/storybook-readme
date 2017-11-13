import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import '../styles/prism-theme-css';

export default (dom, { withJSX = false } = {}) => {
  const nodes = dom.querySelectorAll('pre code');

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
