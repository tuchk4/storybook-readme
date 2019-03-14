import stringRaw from 'string-raw';
import styleFactory from './styleFactory';

let insert = styleFactory('highlight-code-theme');

export default function insertCodeThemeCss({ codeTheme }) {
  import(`./codeThemes/${codeTheme}.css.js`).then(t => {
    insert({
      styles: t.default,
    });
  });
}
