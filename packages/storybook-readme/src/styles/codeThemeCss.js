import styleFactory from './styleFactory';

let insert = styleFactory('highlight-code-theme');

export default function insertCodeThemeCss({ codeTheme }) {
  if (!codeTheme) {
    return;
  }

  import(`./codeThemes/${codeTheme}.css.js`).then(t => {
    insert({
      styles: t.default,
    });
  });
}
