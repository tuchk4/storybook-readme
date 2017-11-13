import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import '../styles/prism-theme-css';

export default (function(dom) {
  var _ref =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref$withJSX = _ref.withJSX,
    withJSX = _ref$withJSX === undefined ? false : _ref$withJSX;

  var nodes = dom.querySelectorAll('pre code');

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
});
